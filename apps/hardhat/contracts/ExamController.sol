// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Exam.sol";

contract ExamController {
    ExamHelper[] exams;

    function calculateStringLength(string calldata _str)
        internal
        pure
        returns (uint256)
    {
        return bytes(_str).length;
    }

    struct ExamHelper {
        string name;
        address examAddress;
    }

    function addExam(string calldata _name, string calldata _shorthand)
        external
    {
        address creatorAddress = msg.sender;

        Exam newExam = new Exam(
            _name,
            _shorthand,
            creatorAddress,
            address(this)
        );

        address examAddress = address(newExam);

        exams.push(ExamHelper(_name, examAddress));
    }
}
