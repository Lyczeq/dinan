// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Exam is ERC721 {
    string examName;
    string examSymbol;
    address creatorAddress;
    address examControllerAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        address _creatorAddress,
        address _examControllerAddress
    ) ERC721(_name, _symbol) {
        examName = _name;
        examSymbol = _symbol;
        creatorAddress = _creatorAddress;
        examControllerAddress = _examControllerAddress;
    }

    modifier isExamControllerAddress() {
        require(
            msg.sender == examControllerAddress,
            "Your address isn't the ExamController Contract address."
        );
        _; // modifier information
    }
}
