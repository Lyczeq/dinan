-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "ExamParticipation" (
    "id" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,
    "examAddress" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ExamParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "address" TEXT NOT NULL,
    "name" TEXT,
    "symbol" TEXT,
    "description" TEXT,
    "creatorAddress" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "examAddress" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamParticipation" ADD CONSTRAINT "ExamParticipation_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamParticipation" ADD CONSTRAINT "ExamParticipation_examAddress_fkey" FOREIGN KEY ("examAddress") REFERENCES "Exam"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examAddress_fkey" FOREIGN KEY ("examAddress") REFERENCES "Exam"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
