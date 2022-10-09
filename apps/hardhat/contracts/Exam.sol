// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./types.sol";
import "hardhat/console.sol";

contract Exam {
    string name;
    uint256 timestamp;
    address creatorAddress;
    string description;
    address examControllerAddress;
    Question[] questions;

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

    function addQuestion(Question calldata _question)
        external
        isExamControllerAddress
    {
        require(
            _question.answers.length <= 6,
            "The maximum number of answers you can add to a single question is 6."
        );

        bool isTheSameId = false;

        for (uint256 i = 0; i < questions.length; i++) {
            if (questions[i].id == _question.id) {
                isTheSameId = true;
                break;
            }
        }

        require(
            !isTheSameId,
            "Some of the questions you have provided have the same id."
        );

        questions.push(_question);
    }

    function getQuestionsWithoutCorrectAnswers()
        public
        view
        returns (Question[] memory)
    {
        // return questions;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
}
