// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Exam.sol";

///  @notice ExamController manages Exam instances. It creates them and allows user to participate in them
contract ExamController {
    /// Strucute to keep information about created Exams
    struct ExamHelper {
        string name;
        address examAddress;
    }

    ExamHelper[] private exams;

    /// @notice Event that is emited after new exam creation
    event NewExamCreation(address newExamAddress, address creatorAddress);

    /// @notice Event that is emited after new exam participation in the exam
    event NewExamParticipation(address examAddress, address participantAddress);

    /// @notice Functiom that creates new Exam
    /// @param _name new exam's name
    /// @param _symbol new exam's NFT symbol
    /// @param _description new exam's description
    function addExam(
        string calldata _name,
        string calldata _symbol,
        string calldata _description
    ) external {
        Exam newExam = new Exam(_name, _symbol, _description);
        exams.push(ExamHelper(_name, address(newExam)));

        emit NewExamCreation(address(newExam), msg.sender);
    }

    /// @notice Functiom that manages new exam participations
    /// @param _examAddressToParticipate exam's address that user wants to participate in
    function manageExamParticipation(
        address _examAddressToParticipate
    ) external {
        bool doesExamWithThisAddressExist = false;

        for (uint256 i = 0; i < exams.length; i++) {
            if (exams[i].examAddress == _examAddressToParticipate) {
                doesExamWithThisAddressExist = true;
                break;
            }
        }

        require(
            doesExamWithThisAddressExist,
            "Exam with the provided address doesn't exist."
        );

        Exam(_examAddressToParticipate).participateInExam(msg.sender);
        emit NewExamParticipation(_examAddressToParticipate, msg.sender);
    }

    /// @notice Functiom that returns exams data
    function getExams() external view returns (ExamHelper[] memory) {
        return exams;
    }
}
