// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Exam is ERC721 {
    // name() method returns Exam's name
    // symbol() method returns Exam's symbol

    struct ExamParticipation {
        bool isFinished;
        uint8 score;
    }

    address private creatorAddress;
    address private examControllerAddress;
    address private backendAddress;
    mapping(address => ExamParticipation) private userScores;

    constructor(
        string memory _name,
        string memory _symbol,
        address _creatorAddress,
        address _examControllerAddress
    ) ERC721(_name, _symbol) {
        creatorAddress = _creatorAddress;
        examControllerAddress = _examControllerAddress;
    }

    modifier isExamControllerAddress() {
        require(
            msg.sender == examControllerAddress,
            "Your address isn't the ExamController Contract address."
        );
        _; // function code
    }

    modifier isBackendAddress() {
        require(
            msg.sender == backendAddress,
            "Your address isn't the backend address."
        );
        _; // function code
    }

    function participateInExam(address participantAddress)
        external
        isExamControllerAddress
    {
        userScores[participantAddress] = ExamParticipation(false, 0);
    }

    function saveParticipantScore(uint8 score, address participantAddress)
        external
        isBackendAddress
    {
        userScores[participantAddress] = ExamParticipation(false, score);
    }
}
