import { X } from "lucide-react";
import { Button } from "./ui/button";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal = ({ isOpen, onClose }: HowToPlayModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4 animate-fade-in">
      {/* Modal Content Container */}
      <div className="bg-background rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform scale-95 animate-scale-in">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-3xl font-extrabold">How to Play</h2>
            <Button
              variant={"ghost"}
              onClick={onClose}
              className="p-1 rounded-full cursor-pointer"
              aria-label="Close how to play instructions"
            >
              <X className="w-7 h-7" />
            </Button>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <span role="img" aria-label="Target">
                  🎯
                </span>{" "}
                Your Objective
              </h3>
              <p>
                Find and click on **Waldo**, **Odlaw**, **Wenda**, **Woof**, and
                **Wizard Whitebeard** in the crowded scene as quickly as
                possible! Your goal is to find *all* of them to complete the
                game.
              </p>
            </div>

            {/* Game Instructions */}
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <span role="img" aria-label="Game Controller">
                  🎮
                </span>
                Game Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>
                  **Choose Your Scene:** Select one of the different scenes from
                  the options.
                </li>
                <li>
                  **Start the Hunt:** Click "Start Game" to begin your
                  adventure. The timer will start immediately!
                </li>
                <li>
                  **Spot the Characters:** Look very carefully at the image for
                  all target characters.
                </li>
                <li>
                  **Make Your Mark:** When you spot a character, click directly
                  on them.
                </li>
                <li>
                  **Confirm Your Find:** A small menu will appear. Select the
                  correct character's name from the options.
                </li>
                <li>
                  **Beat the Clock:** Try to find all characters in the fastest
                  time possible to get on the leaderboard!
                </li>
              </ol>
            </div>

            {/* Character Descriptions & Tips */}
            <div>
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <span role="img" aria-label="Eyes">
                  👀
                </span>{" "}
                Character Descriptions & Tips
              </h3>
              <div className="space-y-4">
                {/* Waldo */}
                <div>
                  <h4 className="font-semibold text-lg mb-1">Waldo:</h4>
                  <ul className="list-disc list-inside space-y-0.5 pl-4">
                    <li>
                      **Signature Look:** He's famous for his **red and white
                      striped long-sleeved shirt**, **distinctive red and white
                      bobble hat**, and **round, black-rimmed glasses**.
                    </li>
                    <li>
                      **Other Details:** He often wears blue jeans and might be
                      carrying a brown walking stick.
                    </li>
                  </ul>
                </div>

                {/* Odlaw */}
                <div>
                  <h4 className="font-semibold text-lg mb-1">Odlaw:</h4>
                  <ul className="list-disc list-inside space-y-0.5 pl-4">
                    <li>
                      **Signature Look:** Waldo's mischievous counterpart, he
                      wears a **black and yellow striped long-sleeved shirt**, a
                      matching **black and yellow bobble hat**, and **dark,
                      round glasses (often with a blue tint)**.
                    </li>
                    <li>
                      **Other Details:** He typically has a small mustache and
                      black trousers.
                    </li>
                  </ul>
                </div>

                {/* Wenda */}
                <div>
                  <h4 className="font-semibold text-lg mb-1">Wenda:</h4>
                  <ul className="list-disc list-inside space-y-0.5 pl-4">
                    <li>
                      **Signature Look:** Waldo's adventurous friend, she wears
                      a **red and white striped long-sleeved shirt**, a **red
                      and white bobble hat**, and **red and white striped
                      tights/stockings**.
                    </li>
                    <li>
                      **Other Details:** She wears a blue skirt and round,
                      black-rimmed glasses, and often carries a camera.
                    </li>
                  </ul>
                </div>

                {/* Woof */}
                <div>
                  <h4 className="font-semibold text-lg mb-1">Woof:</h4>
                  <ul className="list-disc list-inside space-y-0.5 pl-4">
                    <li>
                      **Signature Look:** Waldo's loyal dog. **Only his red and
                      white striped tail is usually visible** in the scenes –
                      finding just the tail is the challenge!
                    </li>
                    <li>
                      **Other Details:** If his full body is shown, he's a white
                      terrier-like dog with a red and white striped bobble hat
                      and glasses.
                    </li>
                  </ul>
                </div>

                {/* Wizard Whitebeard */}
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Wizard Whitebeard:
                  </h4>
                  <ul className="list-disc list-inside space-y-0.5 pl-4">
                    <li>
                      **Signature Look:** He's easily spotted by his
                      **exceptionally long, flowing white beard** (often
                      reaching his knees or beyond), a **tall, pointed blue
                      wizard hat**, and a **long, flowing red robe**.
                    </li>
                    <li>
                      **Other Details:** He often carries a tall, striped staff
                      (red, white, and blue stripes are common) and is sometimes
                      depicted with bare feet.
                    </li>
                  </ul>
                </div>
              </div>{" "}
              {/* General Important Notes */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-semibold text-lg mb-2">Important Notes:</h4>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>
                    **Accuracy is Key:** Take your time to click precisely on
                    the characters. Incorrect clicks won't count and might slow
                    you down.
                  </li>
                  <li>
                    **Timer Starts Immediately:** The moment you click "Start
                    Game," your time begins!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;
