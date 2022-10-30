// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Exam {
    string name;
    string description;
    uint256 timestamp;
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
        uint256 _timestamp,
        string memory _name,
        string memory _description,
        address _creatorAddress,
        address _examControllerAddress
    ) {
        timestamp = _timestamp;
        name = _name;
        description = _description;
        creatorAddress = _creatorAddress;
        examControllerAddress = _examControllerAddress;
    }
}
