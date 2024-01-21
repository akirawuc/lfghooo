// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {IERC3156FlashLender} from "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol";
import {IERC3156FlashBorrower} from "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {ISwapRouter} from "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import {GhoVault} from "./GhoVault.sol";

contract GhoArbitrage is IERC3156FlashBorrower, GhoVault {
    using Math for uint256;
    enum Action {
        SWAP_POOL,
        OTHER
    }

    struct FlashLoanCallbackData {
        Action action;
        bytes data;
    }

    struct SwapPoolData {
        address tokenIn;
        bytes path;
    }

    IERC3156FlashLender private _lender;
    ISwapRouter private _swapRouter;

    bool private _allowRepayment;
    bool private _allowCallback;

    constructor(
        IERC3156FlashLender lender,
        ISwapRouter swapRouter,
        IERC20 token
    ) GhoVault(token) {
        _lender = lender;
        _swapRouter = swapRouter;
        _allowRepayment = true;
        _allowCallback = true;
    }

    /// @dev ERC-3156 Flash loan callback
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        require(
            msg.sender == address(_lender),
            "FlashBorrower: Untrusted lender"
        );
        require(
            initiator == address(this),
            "FlashBorrower: Untrusted loan initiator"
        );

        FlashLoanCallbackData memory callbackData = abi.decode(
            data,
            (FlashLoanCallbackData)
        );
        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        if (callbackData.action == Action.SWAP_POOL) {
            SwapPoolData memory swapPoolData = abi.decode(
                callbackData.data,
                (SwapPoolData)
            );
            IERC20(token).approve(address(_swapRouter), amount);
            uint256 amountOut = _swapRouter.exactInput(
                ISwapRouter.ExactInputParams(
                    swapPoolData.path,
                    address(this),
                    block.timestamp,
                    amount,
                    fee
                )
            );
            // Intentionally left blank.
        } else if (callbackData.action == Action.OTHER) {}

        uint256 balanceAfter = IERC20(token).balanceOf(address(this));
        // Repayment
        if (_allowRepayment) {
            //            require(balanceAfter >= balanceBefore + fee, "FlashBorrower: Untrusted repayment");
            IERC20(token).approve(address(_lender), amount + fee);
        }
        return
            _allowCallback
                ? keccak256("ERC3156FlashBorrower.onFlashLoan")
                : keccak256("arbitrary");
    }

    function flashSwap(
        address token,
        uint256 amount,
        bytes memory path
    ) public {
        SwapPoolData memory swapPoolData = SwapPoolData(token, path);
        FlashLoanCallbackData memory callbackData = FlashLoanCallbackData(
            Action.SWAP_POOL,
            abi.encode(swapPoolData)
        );
        bytes memory data = abi.encode(callbackData);
        _lender.flashLoan(this, token, amount, data);
    }
}
