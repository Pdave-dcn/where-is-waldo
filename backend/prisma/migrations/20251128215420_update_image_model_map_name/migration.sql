/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "character_locations" DROP CONSTRAINT "character_locations_image_id_fkey";

-- DropForeignKey
ALTER TABLE "game_completions" DROP CONSTRAINT "game_completions_image_id_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "original_width" INTEGER NOT NULL,
    "original_height" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_name_key" ON "images"("name");

-- CreateIndex
CREATE UNIQUE INDEX "images_image_url_key" ON "images"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "images_public_id_key" ON "images"("public_id");

-- AddForeignKey
ALTER TABLE "character_locations" ADD CONSTRAINT "character_locations_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_completions" ADD CONSTRAINT "game_completions_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
