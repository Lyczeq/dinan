// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

//TODO: change encode method to public and use it as library
import {Base64} from "../libraries/Base64.sol";

contract Exam is ERC721URIStorage {
    // name() method returns Exam's name
    // symbol() method returns Exam's symbol
    // tokenURI() returns tokenURI based on the tokenId
    // ownerOf() returns tokenId owner's address

    using Counters for Counters.Counter;
    struct ExamParticipation {
        bool isFinished;
        uint8 score;
        bool hasStarted;
    }

    Counters.Counter private _tokenIds;
    address private creatorAddress;
    address private examControllerAddress;
    address private constant backendAddress =
        0x86a74F972A4e5f7ba795F80fD97E62151616406E;
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

    string BASE_SVG =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='green' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    function mintNFT(address _participantAddress, uint8 _score) private {
        uint256 newItemId = _tokenIds.current();

        string memory stringifiedAddress = Strings.toHexString(
            uint160(_participantAddress),
            20
        );

        string memory finalSvg = string(
            abi.encodePacked(
                BASE_SVG,
                "<tspan x='50%' y='25%' font-size='20px'>",
                name(),
                "</tspan>",
                "<tspan x='50%' y='50%' font-size='14px'>",
                stringifiedAddress,
                "</tspan>",
                "<tspan x='50%' y='75%' font-size='40px'>",
                Strings.toString(_score),
                "%</tspan>"
                "</text></svg>"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        name(),
                        '", "description": "DESCRIPTION_PLACEHOLDER", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(_participantAddress, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
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

    function saveParticipantScore(uint8 _score, address _participantAddress)
        external
        isBackendAddress
    {
        partcipantsScores[_participantAddress] = ExamParticipation(
            true,
            _score,
            true
        );
        mintNFT(_participantAddress, _score);
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
