/*
  Warnings:

  - You are about to drop the `CharacterLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameCompletion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharacterLocation" DROP CONSTRAINT "CharacterLocation_gameImageId_fkey";

-- DropForeignKey
ALTER TABLE "GameCompletion" DROP CONSTRAINT "GameCompletion_gameImageId_fkey";

-- DropTable
DROP TABLE "CharacterLocation";

-- DropTable
DROP TABLE "GameCompletion";

-- DropTable
DROP TABLE "GameImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "original_width" INTEGER NOT NULL,
    "original_height" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_locations" (
    "id" TEXT NOT NULL,
    "character_name" TEXT NOT NULL,
    "target_x_ratio" DOUBLE PRECISION NOT NULL,
    "target_y_ratio" DOUBLE PRECISION NOT NULL,
    "tolerance_x_ratio" DOUBLE PRECISION NOT NULL,
    "tolerance_y_ratio" DOUBLE PRECISION NOT NULL,
    "image_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "character_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_completions" (
    "id" TEXT NOT NULL,
    "player_name" TEXT NOT NULL,
    "time_taken_seconds" DOUBLE PRECISION NOT NULL,
    "image_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_completions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_image_url_key" ON "Image"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "Image_public_id_key" ON "Image"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_locations_image_id_character_name_key" ON "character_locations"("image_id", "character_name");

-- AddForeignKey
ALTER TABLE "character_locations" ADD CONSTRAINT "character_locations_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_completions" ADD CONSTRAINT "game_completions_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
