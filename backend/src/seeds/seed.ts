import prisma from "../config/db";
const gameData = [
  {
    image: {
      name: "The Green Maze",
      description:
        "A huge maze of high hedges and bushes, mysterious and full of hidden paths.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1751762104/labyrinth_iyeibh.jpg",
      publicId: "labyrinth_iyeibh",
      originalWidth: 2444,
      originalHeight: 1525,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.5646,
        targetYRatio: 0.4262,
        toleranceXRatio: 0.0164,
        toleranceYRatio: 0.0262,
      },
      {
        characterName: "Odlaw",
        targetXRatio: 0.4362,
        targetYRatio: 0.3056,
        toleranceXRatio: 0.0164,
        toleranceYRatio: 0.0262,
      },
    ],
  },
  {
    image: {
      name: "The Siege Begins",
      description:
        "A medieval army camped outside city walls, with ladders, catapults, and battle preparation.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1751762101/siege_wcejta.jpg",
      publicId: "siege_wcejta",
      originalWidth: 2048,
      originalHeight: 1346,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.6904,
        targetYRatio: 0.3581,
        toleranceXRatio: 0.0195,
        toleranceYRatio: 0.0297,
      },
      {
        characterName: "Odlaw",
        targetXRatio: 0.5537,
        targetYRatio: 0.9383,
        toleranceXRatio: 0.0195,
        toleranceYRatio: 0.0297,
      },
    ],
  },
  {
    image: {
      name: "Storming the Fortress",
      description:
        "The walls have been breached, soldiers flooding in, smoke, and mayhem.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1751762104/battlefield_kwtwdt.jpg",
      publicId: "battlefield_kwtwdt",
      originalWidth: 2828,
      originalHeight: 1828,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.1679,
        targetYRatio: 0.8449,
        toleranceXRatio: 0.0141,
        toleranceYRatio: 0.0219,
      },
      {
        characterName: "Odlaw",
        targetXRatio: 0.7566,
        targetYRatio: 0.7619,
        toleranceXRatio: 0.0141,
        toleranceYRatio: 0.0219,
      },
    ],
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const data of gameData) {
    const gameImage = await prisma.gameImage.upsert({
      where: { imageUrl: data.image.imageUrl },
      update: {
        name: data.image.name,
        description: data.image.description,
        publicId: data.image.publicId,
        originalWidth: data.image.originalWidth,
        originalHeight: data.image.originalHeight,
      },
      create: {
        name: data.image.name,
        description: data.image.description,
        imageUrl: data.image.imageUrl,
        publicId: data.image.publicId,
        originalWidth: data.image.originalWidth,
        originalHeight: data.image.originalHeight,
      },
    });

    console.log(
      `Upserted GameImage with ID: ${gameImage.id} (Name: ${gameImage.name})`
    );

    for (const char of data.characters) {
      await prisma.characterLocation.upsert({
        where: {
          gameImageId_characterName: {
            gameImageId: gameImage.id,
            characterName: char.characterName,
          },
        },
        update: {
          targetXRatio: char.targetXRatio,
          targetYRatio: char.targetYRatio,
          toleranceXRatio: char.toleranceXRatio,
          toleranceYRatio: char.toleranceYRatio,
        },
        create: {
          characterName: char.characterName,
          targetXRatio: char.targetXRatio,
          targetYRatio: char.targetYRatio,
          toleranceXRatio: char.toleranceXRatio,
          toleranceYRatio: char.toleranceYRatio,
          gameImageId: gameImage.id,
        },
      });
      console.log(
        `  Upserted CharacterLocation: ${char.characterName} for ${gameImage.name}`
      );
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
