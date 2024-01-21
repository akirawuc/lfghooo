// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {MockFlashBorrower} from "@gho-core/test/mocks/MockFlashBorrower.sol";
import {GhoFlashMinter} from "@gho-core/contracts/facilitators/flashMinter/GhoFlashMinter.sol";
import {GhoBaseTest} from "./shared/GhoBaseTest.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {GhoVault} from "../contracts/GhoVault.sol";

contract GhoVaultTest is GhoBaseTest {
    GhoVault public vault;
    address public user;
    function setUp() public {
        vault = new GhoVault(IERC20(address(gho)));
        user = address(0x1);
        transferFromWhale(address(gho), user, 10 ** 24);
    }

    function testFuzz_Deposit(uint256 amount) public with(user) {
        vm.assume(amount < 10 ** 24);
        uint256 totalAssetsBefore = vault.totalAssets();
        depositToVault(amount);
        uint256 totalAssetsAfter = vault.totalAssets();
        assertEq(totalAssetsAfter, totalAssetsBefore + amount);
    }

    function testFuzz_Withdraw(uint256 amount) public with(user) {
        vm.assume(amount < 10 ** 24);
        uint256 shares = depositToVault(amount);
        assertEq(vault.balanceOf(user), shares);
        uint256 totalAssetsBefore = vault.totalAssets();
        uint256 withdrawAmount = vault.redeem(shares, user, user);
    }

    function depositToVault(uint256 amount) public returns (uint256) {
        gho.approve(address(vault), amount);
        return vault.deposit(amount, user);
    }
}
