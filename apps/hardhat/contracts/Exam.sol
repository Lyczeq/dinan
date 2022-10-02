// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./utils.sol";

contract Exam {
    string name;
    uint256 timestamp;
    Question[] private questions;

    constructor(uint256 _timestamp, string memory _name) {
        timestamp = _timestamp;
        name = _name;
    }

    function addQuestion(Question calldata _question) external {
        questions.push(_question);
    }
}
