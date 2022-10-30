// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Exam {
    string name;
    string shorthand;
    address creatorAddress;
    address examControllerAddress;

    modifier isExamControllerAddress() {
        require(
            msg.sender == examControllerAddress,
            "Your address isn't the ExamController Contract address."
        );
        _; // modifier information
    }

    constructor(
        string memory _name,
        string memory _shorthand,
        address _creatorAddress,
        address _examControllerAddress
    ) {
        name = _name;
        shorthand = _shorthand;
        creatorAddress = _creatorAddress;
        examControllerAddress = _examControllerAddress;
    }
}
