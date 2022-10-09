// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Exam.sol";
import "./types.sol";
import "./utils.sol";

contract ExamController {
    ExamHelper[] exams;

    struct ExamHelper {
        string name;
        string description;
        address examAddress;
        uint256 timestamp;
    }

    function validateAddExamData(
        string calldata _name,
        string calldata _description,
        Question[] calldata _questions
    ) internal pure {
        require(
            calculateStringLength(_description) > 0,
            "The description of the Exam cannot be empty."
        );

        require(
            calculateStringLength(_name) > 0,
            "The name of the Exam cannot be empty."
        );
        require(
            _questions.length > 0,
            "The questions array you've provided is empty."
        );

        require(
            _questions.length <= 30,
            "The maximum number of questions you can add is 30."
        );
    }

    function addExam(
        string calldata _name,
        string calldata _description,
        Question[] calldata _questions
    ) public {
        validateAddExamData(_name, _description, _questions);

        uint256 timestamp = block.timestamp;
        address creatorAddress = msg.sender;

        Exam newExam = new Exam(
            timestamp,
            _name,
            _description,
            creatorAddress,
            address(this)
        );

        // add questions
        for (uint8 i = 0; i < _questions.length; i++) {
            newExam.addQuestion(_questions[i]);
        }

        exams.push(
            ExamHelper(_name, _description, newExam.getAddress(), timestamp)
        );
    }

    function getExams() public view returns (ExamHelper[] memory) {
        return exams;
    }
}
