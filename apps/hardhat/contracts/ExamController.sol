// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Exam.sol";
import "./utils.sol";

contract ExamController {
    Exam[] private exams;

    function addExam(string memory _name, Question[] calldata _questions)
        public
    {
        uint256 timestamp = block.timestamp;
        Exam newExam = new Exam(timestamp, _name);
        for (uint256 i = 0; i < _questions.length; i++) {
            newExam.addQuestion(_questions[i]);
        }
        exams.push(newExam);
    }

    function getExams() public view returns (Exam[] memory) {
        return exams;
    }
}
