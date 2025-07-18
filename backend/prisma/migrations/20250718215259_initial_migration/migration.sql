-- CreateTable
CREATE TABLE "GameImage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "originalWidth" INTEGER NOT NULL,
    "originalHeight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterLocation" (
    "id" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "targetXRatio" DOUBLE PRECISION NOT NULL,
    "targetYRatio" DOUBLE PRECISION NOT NULL,
    "toleranceXRatio" DOUBLE PRECISION NOT NULL,
    "toleranceYRatio" DOUBLE PRECISION NOT NULL,
    "gameImageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCompletion" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "timeTakenSeconds" DOUBLE PRECISION NOT NULL,
    "gameImageId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameImage_name_key" ON "GameImage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameImage_imageUrl_key" ON "GameImage"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "GameImage_publicId_key" ON "GameImage"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterLocation_gameImageId_characterName_key" ON "CharacterLocation"("gameImageId", "characterName");

-- AddForeignKey
ALTER TABLE "CharacterLocation" ADD CONSTRAINT "CharacterLocation_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "GameImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCompletion" ADD CONSTRAINT "GameCompletion_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "GameImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
