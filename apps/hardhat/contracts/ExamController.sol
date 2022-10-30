// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Exam.sol";
import "./utils.sol";

contract ExamController {
    ExamHelper[] exams;

    struct ExamHelper {
        string name;
        string description;
        address examAddress;
        uint256 timestamp;
    }

    function addExam(string calldata _name, string calldata _description)
        external
    {
        uint256 timestamp = block.timestamp;
        address creatorAddress = msg.sender;

        Exam newExam = new Exam(
            timestamp,
            _name,
            _description,
            creatorAddress,
            address(this)
        );

        address examAddress = address(newExam);

        exams.push(ExamHelper(_name, _description, examAddress, timestamp));
    }
}
