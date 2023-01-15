# Solidity API

## Exam

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

Function that allows the user to participate

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

Function that checks whether sender address is the same as backend's

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

### NewExamParticipation

```solidity
event NewExamParticipation(address examAddress, address participantAddress)
```

### addExam

```solidity
function addExam(string _name, string _symbol, string _description) external
```

### manageExamParticipation

```solidity
function manageExamParticipation(address _examAddressToParticipate) external
```

### getExams

```solidity
function getExams() external view returns (struct ExamController.ExamHelper[])
```

