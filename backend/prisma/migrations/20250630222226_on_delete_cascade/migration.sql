-- DropForeignKey
ALTER TABLE "CharacterLocation" DROP CONSTRAINT "CharacterLocation_gameImageId_fkey";

-- DropForeignKey
ALTER TABLE "GameCompletion" DROP CONSTRAINT "GameCompletion_gameImageId_fkey";

-- AddForeignKey
ALTER TABLE "CharacterLocation" ADD CONSTRAINT "CharacterLocation_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "GameImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCompletion" ADD CONSTRAINT "GameCompletion_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "GameImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
