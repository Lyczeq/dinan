/*
  Warnings:

  - You are about to drop the column `userAddress` on the `ExamParticipation` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `participantAddress` to the `ExamParticipation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamParticipation" DROP CONSTRAINT "ExamParticipation_userAddress_fkey";

-- AlterTable
ALTER TABLE "ExamParticipation" DROP COLUMN "userAddress",
ADD COLUMN     "participantAddress" TEXT NOT NULL,
ALTER COLUMN "score" DROP NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Participant" (
    "address" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("address")
);

-- AddForeignKey
ALTER TABLE "ExamParticipation" ADD CONSTRAINT "ExamParticipation_participantAddress_fkey" FOREIGN KEY ("participantAddress") REFERENCES "Participant"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
