# Prisma directory

Prisma ORM related files. Schema.prisma defines models and database connection.

In migrations directory, there are specified migrations files to migrate or create a new database

# Src directory

## Controllers directory

### Exams

Controllers of the `/exams` endpoint.

- `getAllExams` is used to get all exams
- `updateExamWithQuestions` is used to upadate newly created exam with questions defined in the client application
- `getSingleExam` returns details of the single exam without questions and answers
- `getExamsQuestionsAndAnswers` - returns details of the single exam with questions and answers
- `compareParticipantAnswers` compares participant's answers on questions. Calculates the scores and sends transaction to blockchain.

### Users

Controllers of `/users` endpoint

- `getExamsCreatedBySpecificUser` returns all the exams that specific user is author
- `getUserCertificates` returns certificates of the specific user
- `getNFTMetadata` returns details of the certificates
- `getUserScoreOfSpecificExam` returns score of the specific exam that the user has already participated in

## Routes directory

### Exams

Routes of the exams endpoint

- Route: `/`,
  Method: `GET`,
  Aim: Get all exams
- Route: `/:address`,
  Method: `GET`,
  Aim: Get specific exam without its questions and answers
- Route: `/:address`,
  Method: `PUT`,
  Aim: Update exam to add name, symbol, description, questions and answers
- Route: `/:address/participate`,
  Method: `GET`,
  Aim: Get specific exam with its questions and answers
- Route: `/:address/compare`,
  Method: `POST`,
  Aim: Compare given answers with the correct one.

### Users

Routes of the users endpoint

- Route: `/:address/exams`,
  Method: `GET`,
  Aim: Get exams created by a specific user
- Route: `/:address/certificates`,
  Method: `GET`,
  Aim: Get certificates of a specific user
- Route: `/:address/certificates/:certAddress`,
  Method: `GET`,
  Aim: Get details of a specific certificate
- Route: `/:address/exams/:examAddress`,
  Method: `GET`,
  Aim: Get user score of a spefici exam

## Websockets directory

### Class `ContractHandler`

Properties:

- `providerNetwork` - network of the provider
- `websocketProviderNetwork` - options of the websocket provider

Methods:

- `listenOnNewExamCreation` - it listens on the `NewExamCreation` event using Websocket protocol in the `ExamController` smart contract
- `listenOnNewExamParticipation` - it listens on the `NewExamParticipation` event using Websocket protocol in the `ExamController` smart contract
- `setupWebsockets` - it sets up listeners above
- `sendScoreAndMakeNFT` - it sends transaction to a specific Exam smart contract to add a score of a specific participant

## app.ts file

It runs the express server

## config.ts file

It validates the environment variables

## prisma.ts file

It creates a `PrismaClient` instance to be used in controllers to create queries to database
