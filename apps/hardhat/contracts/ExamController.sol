// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Exam.sol";

contract ExamController {
    struct ExamHelper {
        string name;
        address examAddress;
    }

    ExamHelper[] private exams;
    event NewExamCreation(address newExamAddress, address creatorAddress);
    event NewExamParticipation(address examAddress, address participantAddress);

    function addExam(string calldata _name, string calldata _symbol) external {
        Exam newExam = new Exam(_name, _symbol, msg.sender, address(this));
        exams.push(ExamHelper(_name, address(newExam)));

        emit NewExamCreation(address(newExam), msg.sender);
    }

    function manageExamParticipation(address _examAddressToParticipate)
        external
    {
        bool doesExamWithThisAddressExist = false;

        for (uint256 i = 0; i < exams.length; i++) {
            if (exams[i].examAddress == _examAddressToParticipate) {
                doesExamWithThisAddressExist = true;
            }
        }

        require(
            doesExamWithThisAddressExist,
            "Exam with the provided address doesn't exist."
        );

        Exam(_examAddressToParticipate).participateInExam(msg.sender);
        emit NewExamParticipation(_examAddressToParticipate, msg.sender);
    }

    function getExams() external view returns (ExamHelper[] memory) {
        return exams;
    }
}
