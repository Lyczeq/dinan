// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

function calculateStringLength(string calldata _str) pure returns (uint256) {
    return bytes(_str).length;
}
