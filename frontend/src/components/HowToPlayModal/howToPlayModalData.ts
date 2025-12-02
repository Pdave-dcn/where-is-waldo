export interface Character {
  name: string;
  signatureLook: string;
  otherDetails: string;
}

export const characters: Character[] = [
  {
    name: "Waldo",
    signatureLook:
      "He's famous for his **red and white striped long-sleeved shirt**, **distinctive red and white bobble hat**, and **round, black-rimmed glasses**.",
    otherDetails:
      "He often wears blue jeans and might be carrying a brown walking stick.",
  },
  {
    name: "Odlaw",
    signatureLook:
      "Waldo's mischievous counterpart, he wears a **black and yellow striped long-sleeved shirt**, a matching **black and yellow bobble hat**, and **dark, round glasses (often with a blue tint)**.",
    otherDetails: "He typically has a small mustache and black trousers.",
  },
  {
    name: "Wenda",
    signatureLook:
      "Waldo's adventurous friend, she wears a **red and white striped long-sleeved shirt**, a **red and white bobble hat**, and **red and white striped tights/stockings**.",
    otherDetails:
      "She wears a blue skirt and round, black-rimmed glasses, and often carries a camera.",
  },
  {
    name: "Woof",
    signatureLook:
      "Waldo's loyal dog. **Only his red and white striped tail is usually visible** in the scenes – finding just the tail is the challenge!",
    otherDetails:
      "If his full body is shown, he's a white terrier-like dog with a red and white striped bobble hat and glasses.",
  },
  {
    name: "Wizard Whitebeard",
    signatureLook:
      "He's easily spotted by his **exceptionally long, flowing white beard** (often reaching his knees or beyond), a **tall, pointed blue wizard hat**, and a **long, flowing red robe**.",
    otherDetails:
      "He often carries a tall, striped staff (red, white, and blue stripes are common) and is sometimes depicted with bare feet.",
  },
];

export const gameInstructions: string[] = [
  "**Choose Your Scene:** Select one of the different scenes from the options.",
  '**Start the Hunt:** Click "Start Game" to begin your adventure. The timer will start immediately!',
  "**Spot the Characters:** Look very carefully at the image for all target characters.",
  "**Make Your Mark:** When you spot a character, click directly on them.",
  "**Confirm Your Find:** A small menu will appear. Select the correct character's name from the options.",
  "**Beat the Clock:** Try to find all characters in the fastest time possible to get on the leaderboard!",
];

export const importantNotes: string[] = [
  "**Accuracy is Key:** Take your time to click precisely on the characters. Incorrect clicks won't count and might slow you down.",
  '**Timer Starts Immediately:** The moment you click "Start Game", your time begins!',
];
