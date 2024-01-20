// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./utils/Withdraw.sol";

interface IWETH {
    function withdraw(uint256 wad) external;
}

contract SwapSourceMinter is Withdraw {
    enum PayFeesIn {
        Native,
        LINK
    }

    address immutable i_router;
    address immutable i_link;
    address private immutable ghoTokenAddress = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;
    address private immutable wethAddress = 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14;
    ISwapRouter public immutable swapRouter;
    uint24 public constant poolFee = 3000; // Pool fee tier (0.3%)

    event MessageSent(bytes32 messageId);

    constructor(
        address router, 
        address link, 
        address _swapRouter
    ) {
        i_router = router;
        i_link = link;
        swapRouter = ISwapRouter(_swapRouter);
        LinkTokenInterface(i_link).approve(i_router, type(uint256).max);
    }

    receive() external payable {}

    function swapGHOForETH(uint256 amountIn) private returns (uint256 amountOut) {
        // Transfer GHO tokens to this contract
        TransferHelper.safeTransferFrom(ghoTokenAddress, msg.sender, address(this), amountIn);

        // Approve the router to spend GHO
        TransferHelper.safeApprove(ghoTokenAddress, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: ghoTokenAddress,
                tokenOut: wethAddress,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0, // Set to a reasonable minimum in production
                sqrtPriceLimitX96: 0
            });

        // Execute the swap to get WETH
        amountOut = swapRouter.exactInputSingle(params);

        // Unwrap WETH to ETH
        IWETH(wethAddress).withdraw(amountOut);
    }

    function mint(
        uint64 destinationChainSelector,
        address nftAddress, // NFT contract address
        address receiver,
        PayFeesIn payFeesIn,
        uint256 ghoAmount // Amount of GHO to swap
    ) external {
        // Swap GHO for ETH
        swapGHOForETH(ghoAmount);

        // Construct the CCIP message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature("mint(address,bytes)", nftAddress, abi.encodeWithSignature("mint(address)", msg.sender)),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;
        if (payFeesIn == PayFeesIn.LINK) {
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }

        emit MessageSent(messageId);
    }
}
