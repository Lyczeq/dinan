// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Answer {
    uint8 id;
    string answerText;
    bool isCorrect;
}

struct Question {
    uint8 id;
    string header;
    string description;
    Answer[] answers;
}
