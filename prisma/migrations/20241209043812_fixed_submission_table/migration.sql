/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "submission_teamId_key" ON "submission"("teamId");
