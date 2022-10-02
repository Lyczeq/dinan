// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Answer {
    string answerText;
    bool isCorrect;
}

struct Question {
    string header;
    string description;
    Answer[] answers;
}
