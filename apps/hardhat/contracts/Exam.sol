// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./utils.sol";
import "hardhat/console.sol";

contract Exam {
    string name;
    uint256 timestamp;
    address creatorAddress;
    string description;
    Question[] questions;

    constructor(
        uint256 _timestamp,
        string memory _name,
        string memory _description,
        address _creatorAddress
    ) {
        timestamp = _timestamp;
        name = _name;
        description = _description;
        creatorAddress = _creatorAddress;
    }

    function addQuestion(Question calldata _question) public {
        questions.push(_question);
    }

    function getQuestions() public view returns (Question[] memory) {
        return questions;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
}
