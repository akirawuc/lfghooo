// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {GhoArbitrage} from "../src/contracts/GhoArbitrage.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISwapRouter} from "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import {IERC3156FlashLender} from "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol";

contract DeploymentScript is Script {

    function deploy() public returns (address) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address swapRouter=vm.envAddress("SWAP_ROUTER");
        address flashMinter=vm.envAddress("FLASH_MINTER");
        address gho=vm.envAddress("GHO");
        vm.startBroadcast(deployerPrivateKey);
        GhoArbitrage ghoArbitrage=new GhoArbitrage(IERC3156FlashLender(flashMinter),ISwapRouter(swapRouter),IERC20(gho));
        vm.label(address(ghoArbitrage), "GhoArbitrage");
        return address(ghoArbitrage);
    }
}
