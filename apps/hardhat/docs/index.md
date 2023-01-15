# Solidity API

## Exam

It holds NFTs that are used as the certifiactes of participating in the exam

### ExamParticipation

```solidity
struct ExamParticipation {
  bool isFinished;
  uint8 score;
  bool hasStarted;
}
```

### constructor

```solidity
constructor(string _name, string _symbol, string _description) public
```

Constructor initialize basic properties and add description

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | exam's name |
| _symbol | string | exam's NFT symbol |
| _description | string | exam's description |

### BASE_SVG

```solidity
string BASE_SVG
```

base SVG string used to create NFT image

### participateInExam

```solidity
function participateInExam(address _participantAddress) external
```

Function that allows the user to participate in the exam

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _participantAddress | address | address of the participant |

### saveParticipantScore

```solidity
function saveParticipantScore(uint8 _score, address _participantAddress) external
```

Function that saves participant's score

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _score | uint8 | score that participant has got |
| _participantAddress | address | address of the participant |

### isBackendAddress

```solidity
modifier isBackendAddress()
```

Modifier that checks whether sender address is the same as backend's

### getParticipantResult

```solidity
function getParticipantResult(address _userAddress) external view returns (struct Exam.ExamParticipation)
```

Function that gets the result of exam of a certain participant

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _userAddress | address | address of the user |

### _transfer

```solidity
function _transfer(address, address, uint256) internal virtual
```

Function that has been overriden to disallow transfering certificates

## ExamController

@notice ExamController manages Exam instances. It creates them and allows user to participate in them

### ExamHelper

```solidity
struct ExamHelper {
  string name;
  address examAddress;
}
```

### NewExamCreation

```solidity
event NewExamCreation(address newExamAddress, address creatorAddress)
```

Event that is emited after new exam creation

### NewExamParticipation

```solidity
event NewExamParticipation(address examAddress, address participantAddress)
```

Event that is emited after new exam participation in the exam

### addExam

```solidity
function addExam(string _name, string _symbol, string _description) external
```

Functiom that creates new Exam

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | new exam's name |
| _symbol | string | new exam's NFT symbol |
| _description | string | new exam's description |

### manageExamParticipation

```solidity
function manageExamParticipation(address _examAddressToParticipate) external
```

Functiom that manages new exam participations

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _examAddressToParticipate | address | exam's address that user wants to participate in |

### getExams

```solidity
function getExams() external view returns (struct ExamController.ExamHelper[])
```

Functiom that returns exams data

