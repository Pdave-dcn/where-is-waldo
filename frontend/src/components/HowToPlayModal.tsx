import { X } from "lucide-react";
import { Button } from "./ui/button";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Character {
  name: string;
  signatureLook: string;
  otherDetails: string;
}

const HowToPlayModal = ({ isOpen, onClose }: HowToPlayModalProps) => {
  if (!isOpen) return null;

  const characters: Character[] = [
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

  const gameInstructions: string[] = [
    "**Choose Your Scene:** Select one of the different scenes from the options.",
    '**Start the Hunt:** Click "Start Game" to begin your adventure. The timer will start immediately!',
    "**Spot the Characters:** Look very carefully at the image for all target characters.",
    "**Make Your Mark:** When you spot a character, click directly on them.",
    "**Confirm Your Find:** A small menu will appear. Select the correct character's name from the options.",
    "**Beat the Clock:** Try to find all characters in the fastest time possible to get on the leaderboard!",
  ];

  const importantNotes: string[] = [
    "**Accuracy is Key:** Take your time to click precisely on the characters. Incorrect clicks won't count and might slow you down.",
    '**Timer Starts Immediately:** The moment you click "Start Game," your time begins!',
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4 animate-fade-in">
      <div className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] transform scale-95 animate-scale-in flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 sm:p-8 pb-4 border-b flex-shrink-0">
          <h2 className="text-3xl font-extrabold">How to Play</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-1 rounded-full cursor-pointer"
            aria-label="Close how to play instructions"
          >
            <X className="w-7 h-7" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 pt-6">
          <div className="space-y-6">
            {/* Objective Section */}
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <span role="img" aria-label="Target">
                  🎯
                </span>
                Your Objective
              </h3>
              <p>
                Find and click on **Waldo**, **Odlaw**, **Wenda**, **Woof**, and
                **Wizard Whitebeard** in the crowded scene, if they are present,
                as quickly as possible! Your goal is to find *all* of them to
                complete the game.
              </p>
            </div>

            {/* Game Instructions Section */}
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <span role="img" aria-label="Game Controller">
                  🎮
                </span>
                Game Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                {gameInstructions.map((instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {/* Character Reference Image */}
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <span role="img" aria-label="Camera">
                  📸
                </span>
                Character Reference
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 mb-4">
                  Here's a visual reference of all the characters you need to
                  find:
                </p>
                <div className="flex justify-center">
                  <img
                    src="/where-is-waldo-characters.png"
                    alt="Where's Waldo characters reference showing Waldo, Odlaw, Wenda, Woof, and Wizard Whitebeard"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Character Descriptions Section */}
            <div>
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <span role="img" aria-label="Eyes">
                  👀
                </span>
                Character Descriptions & Tips
              </h3>
              <div className="space-y-4">
                {characters.map((character: Character, index: number) => (
                  <div key={index}>
                    <h4 className="font-semibold text-lg mb-1">
                      {character.name}:
                    </h4>
                    <ul className="list-disc list-inside space-y-0.5 pl-4">
                      <li>
                        <span className="font-medium">Signature Look:</span>{" "}
                        {character.signatureLook}
                      </li>
                      <li>
                        <span className="font-medium">Other Details:</span>{" "}
                        {character.otherDetails}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes Section */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-semibold text-lg mb-2">Important Notes:</h4>
              <ul className="list-disc list-inside space-y-1 pl-4">
                {importantNotes.map((note: string, index: number) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;
