// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {MockFlashBorrower} from "@gho-core/test/mocks/MockFlashBorrower.sol";
import {GhoFlashMinter} from "@gho-core/contracts/facilitators/flashMinter/GhoFlashMinter.sol";
import {GhoBaseTest} from "./shared/GhoBaseTest.sol";
import {GhoArbitrage} from "../contracts/GhoArbitrage.sol";
import {ISwapRouter} from "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GhoArbitrageTest is GhoBaseTest {
    ISwapRouter public router;
    GhoArbitrage public arbitrage;
    address public user;
    IERC20 public usdc;
    IERC20 public usdt;
    function setUp() public {
        router = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
        arbitrage = new GhoArbitrage(minter, router, gho);
        user = address(0x1);
        usdc = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
        usdt = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
        transferFromWhale(address(gho), user, 10 ** 20);
        transferFromWhale(address(gho), address(arbitrage), 10 ** 20);
    }

    function test_FlashSwap() public {
        bytes memory path = abi.encodePacked(
            address(gho),
            uint24(500),
            address(usdc),
            uint24(100),
            address(usdt),
            uint24(500),
            address(gho)
        );
        arbitrage.flashSwap(address(gho), 10 ** 20, path);
    }
}
