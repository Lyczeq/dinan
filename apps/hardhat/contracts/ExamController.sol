// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Exam.sol";

contract ExamController {
    ExamHelper[] exams;

    event NewExamCreation(address _newExamAddress, address _creatorAddress);

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

    function addExam(string calldata _name, string calldata _symbol) external {
        Exam newExam = new Exam(_name, _symbol, msg.sender, address(this));

        exams.push(ExamHelper(_name, address(newExam)));
        emit NewExamCreation(address(newExam), msg.sender);
    }
}
