// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import {GhoFlashMinter} from "@gho-core/contracts/facilitators/flashMinter/GhoFlashMinter.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";

contract GhoBaseTest is Test {
    address public whaleAddress;
    GhoFlashMinter public minter;
    IERC20 public gho;
    constructor(){
        whaleAddress = 0xE831C8903de820137c13681E78A5780afDdf7697;
        gho = IERC20(0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f);
        minter = GhoFlashMinter(0xb639D208Bcf0589D54FaC24E655C79EC529762B8);
    }

    modifier with(address _user) {
        vm.startPrank(_user);
        _;
        vm.stopPrank();
    }

    function initialize(address _whaleAddress) public {
        whaleAddress = _whaleAddress;
    }

    function transferFromWhale(address _token, address _to, uint256 _amount) public with(whaleAddress) {
        IERC20(_token).transfer(_to, _amount);
    }
}
