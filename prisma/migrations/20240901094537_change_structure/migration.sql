-- CreateIndex
CREATE INDEX "AdoptionUser_petId_userId_idx" ON "AdoptionUser"("petId", "userId");

-- CreateIndex
CREATE INDEX "UserShelter_userId_shelterId_idx" ON "UserShelter"("userId", "shelterId");
