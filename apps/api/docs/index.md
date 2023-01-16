# Prisma Directory

Prisma ORM related files. Schema.prisma defines models and database connection.

In migrations directory, there are specified migrations files to migrate or create a new database

# Src Directory

## Controllers

1. Exams

Controllers of the `/exams` endpoint.

- `getAllExams` is used to get all exams
- `updateExamWithQuestions` is used to upadate newly created exam with questions defined in the client application
- `getSingleExam` returns details of the single exam without questions and answers
- `getExamsQuestionsAndAnswers` - returns details of the single exam with questions and answers
- `compareParticipantAnswers` compares participant's answers on questions. Calculates the scores and sends transaction to blockchain.

2. Users
   Controllers of `/users` endpoint

- `getExamsCreatedBySpecificUser` returns all the exams that specific user is author
- `getUserCertificates` returns certificates of the specific user
- `getNFTMetadata` returns details of the certificates
- `getUserScoreOfSpecificExam` returns score of the specific exam that the user has already participated in


