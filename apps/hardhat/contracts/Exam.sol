// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Base64} from "../libraries/Base64.sol";

contract Exam is ERC721 {
    // name() method returns Exam's name
    // symbol() method returns Exam's symbol

    using Counters for Counters.Counter;
    struct ExamParticipation {
        bool isFinished;
        uint8 score;
        bool hasStarted;
    }

    Counters.Counter private _tokenIds;
    address private creatorAddress;
    address private examControllerAddress;
    address private backendAddress;
    mapping(address => ExamParticipation) private partcipantsScores;

    constructor(
        string memory _name,
        string memory _symbol,
        address _creatorAddress,
        address _examControllerAddress
    ) ERC721(_name, _symbol) {
        creatorAddress = _creatorAddress;
        examControllerAddress = _examControllerAddress;
    }

    function participateInExam(address participantAddress)
        external
        isExamControllerAddress
    {
        partcipantsScores[participantAddress] = ExamParticipation(
            false,
            0,
            true
        );
    }

    function saveParticipantScore(uint8 score, address participantAddress)
        external
        isBackendAddress
    {
        partcipantsScores[participantAddress] = ExamParticipation(
            true,
            score,
            true
        );
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

    function getParticipantResult(address _userAddress)
        external
        view
        returns (ExamParticipation memory)
    {
        require(
            partcipantsScores[_userAddress].hasStarted,
            "There is no participant with this address."
        );
        return partcipantsScores[_userAddress];
    }
}
