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
    ) private pure {
        require(
            calculateStringLength(_name) >= 5,
            "The exam name should be longer than 5 characters."
        );

        require(
            calculateStringLength(_description) >= 10,
            "The exam description should be longer than 10 characters."
        );

        require(
            _questions.length > 0,
            "The minimum number of question you can add is one."
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
    ) external {
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
