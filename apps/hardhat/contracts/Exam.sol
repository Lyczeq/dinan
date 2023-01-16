// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {Base64} from "../libraries/Base64.sol";

///@notice It holds NFTs that are used as the certifiactes of participating in the exam
contract Exam is ERC721URIStorage, Ownable {
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
    address private constant backendAddress =
        0x86a74F972A4e5f7ba795F80fD97E62151616406E;
    string private description;

    mapping(address => ExamParticipation) private partcipantsScores;

    /// @notice Constructor initialize basic properties and add description
    /// @param _name exam's name
    /// @param _symbol exam's NFT symbol
    /// @param _description exam's description
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description
    ) ERC721(_name, _symbol) {
        description = _description;
    }

    /// @notice base SVG string used to create NFT image
    string BASE_SVG =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='#FB923C' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    /// @notice Function for minting NFT for the participant who has already finished exam
    /// @param _participantAddress address of the participant
    /// @param _score score that participant has got
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
                "<tspan x='50%' y='75%' font-size='40px'> Score ",
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
                        '", "description": "',
                        description,
                        '", "image": "data:image/svg+xml;base64,',
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

    /// @notice Function that allows the user to participate in the exam
    /// @param _participantAddress address of the participant
    function participateInExam(address _participantAddress) external onlyOwner {
        require(
            partcipantsScores[_participantAddress].hasStarted == false,
            "The user with this address has already started the exam"
        );

        partcipantsScores[_participantAddress] = ExamParticipation(
            false,
            0,
            true
        );
    }

    /// @notice Function that saves participant's score
    /// @param _participantAddress address of the participant
    /// @param _score score that participant has got
    function saveParticipantScore(
        uint8 _score,
        address _participantAddress
    ) external isBackendAddress {
        require(
            partcipantsScores[_participantAddress].isFinished == false,
            "The user with this address has already finished the exam"
        );

        partcipantsScores[_participantAddress] = ExamParticipation(
            true,
            _score,
            true
        );
        mintNFT(_participantAddress, _score);
    }

    /// @notice Modifier that checks whether sender address is the same as backend's
    modifier isBackendAddress() {
        require(
            msg.sender == backendAddress,
            "Your address isn't the backend address."
        );
        _; // function code
    }

    /// @notice Function that gets the result of exam of a certain participant
    /// @param _userAddress address of the user
    function getParticipantResult(
        address _userAddress
    ) external view returns (ExamParticipation memory) {
        require(
            partcipantsScores[_userAddress].hasStarted,
            "There is no participant with this address."
        );
        return partcipantsScores[_userAddress];
    }

    /// @notice Function that has been overriden to disallow transfering certificates
    function _transfer(address, address, uint256) internal virtual override {
        revert("You cannot transfer Exam tokens");
    }
}
