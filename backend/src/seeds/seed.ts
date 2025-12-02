import prisma from "../core/config/db.js";
const gameData = [
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
    ],
  },
  {
    image: {
      name: "The Toyport Invasion",
      description:
        "The ship has landed, and now the dock’s alive with plushes, puppets, and plastic pals rushing to get aboard. Some are loading cargo, others are hosting tea parties.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1752785702/toyport_dipyby.jpg",
      publicId: "toyport_dipyby",
      originalWidth: 2572,
      originalHeight: 1892,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.0743,
        targetYRatio: 0.5692,
        toleranceXRatio: 0.0156,
        toleranceYRatio: 0.0211,
      },
    ],
  },
  {
    image: {
      name: "Robin Hood's Merry Mess-up",
      description:
        "The Sheriff’s big day is in total disarray! Robin Hood’s band of merry men has stormed Nottingham Castle for a little mischief and a lot of laughs.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1752785701/robin-hood_n11ran.jpg",
      publicId: "robin-hood_n11ran",
      originalWidth: 3840,
      originalHeight: 2160,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.6286,
        targetYRatio: 0.7056,
        toleranceXRatio: 0.0104,
        toleranceYRatio: 0.0185,
      },
      {
        characterName: "Odlaw",
        targetXRatio: 0.2323,
        targetYRatio: 0.636,
        toleranceXRatio: 0.0104,
        toleranceYRatio: 0.0185,
      },
    ],
  },
  {
    image: {
      name: "Kick-Off Chaos",
      description:
        "Who’s winning? Who knows! With half the town on the pitch and the goal protected like a castle gate, this game is out of control.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1752625207/kick-off_vs9ggz.jpg",
      publicId: "kick-off_vs9ggz",
      originalWidth: 2002,
      originalHeight: 1278,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.9605,
        targetYRatio: 0.061,
        toleranceXRatio: 0.02,
        toleranceYRatio: 0.0313,
      },
      {
        characterName: "Odlaw",
        targetXRatio: 0.9211,
        targetYRatio: 0.5736,
        toleranceXRatio: 0.02,
        toleranceYRatio: 0.0313,
      },
      {
        characterName: "Wizard",
        targetXRatio: 0.2951,
        targetYRatio: 0.4233,
        toleranceXRatio: 0.02,
        toleranceYRatio: 0.0313,
      },
      {
        characterName: "Wenda",
        targetXRatio: 0.2827,
        targetYRatio: 0.6673,
        toleranceXRatio: 0.02,
        toleranceYRatio: 0.0313,
      },
    ],
  },
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
      {
        characterName: "Wenda",
        targetXRatio: 0.7651,
        targetYRatio: 0.5311,
        toleranceXRatio: 0.0164,
        toleranceYRatio: 0.0262,
      },
      {
        characterName: "Wizard",
        targetXRatio: 0.6759,
        targetYRatio: 0.2918,
        toleranceXRatio: 0.0164,
        toleranceYRatio: 0.0262,
      },
      {
        characterName: "Woof",
        targetXRatio: 0.0982,
        targetYRatio: 0.519,
        toleranceXRatio: 0.0327,
        toleranceYRatio: 0.0525,
      },
    ],
  },
  {
    image: {
      name: "Roller Coasters and Roasted Targets",
      description:
        "The mechanical horses are bucking, someone’s setting things on fire on purpose, and a pie just flew past your head. Welcome to the wildest amusement park around.",
      imageUrl:
        "https://res.cloudinary.com/dqpbvnhco/image/upload/v1752625207/roller-coasters_j89sno.png",
      publicId: "roller-coasters_j89sno",
      originalWidth: 1920,
      originalHeight: 1090,
    },
    characters: [
      {
        characterName: "Waldo",
        targetXRatio: 0.7391,
        targetYRatio: 0.5193,
        toleranceXRatio: 0.0208,
        toleranceYRatio: 0.0367,
      },
      {
        characterName: "Odlaw",
        targetXRatio: 0.5953,
        targetYRatio: 0.2431,
        toleranceXRatio: 0.0208,
        toleranceYRatio: 0.0367,
      },
      {
        characterName: "Wenda",
        targetXRatio: 0.099,
        targetYRatio: 0.7945,
        toleranceXRatio: 0.0208,
        toleranceYRatio: 0.0367,
      },
      {
        characterName: "Wizard",
        targetXRatio: 0.4109,
        targetYRatio: 0.5789,
        toleranceXRatio: 0.0208,
        toleranceYRatio: 0.0367,
      },
      {
        characterName: "Woof",
        targetXRatio: 0.4609,
        targetYRatio: 0.9128,
        toleranceXRatio: 0.0417,
        toleranceYRatio: 0.0734,
      },
    ],
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const data of gameData) {
    const gameImage = await prisma.image.upsert({
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
          imageId_characterName: {
            imageId: gameImage.id,
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
          imageId: gameImage.id,
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
