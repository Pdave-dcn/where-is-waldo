import { X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              className="flex justify-between items-center p-6 sm:p-8 pb-4 border-b flex-shrink-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.h2
                className="text-3xl font-extrabold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                How to Play
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="p-1 rounded-full cursor-pointer"
                  aria-label="Close how to play instructions"
                >
                  <X className="w-7 h-7" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 pt-6">
              <div className="space-y-6">
                {/* Objective Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.h3
                    className="font-bold text-xl mb-2 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <motion.span
                      role="img"
                      aria-label="Target"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      🎯
                    </motion.span>
                    Your Objective
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    Find and click on **Waldo**, **Odlaw**, **Wenda**, **Woof**,
                    and **Wizard Whitebeard** in the crowded scene, if they are
                    present, as quickly as possible! Your goal is to find *all*
                    of them to complete the game.
                  </motion.p>
                </motion.div>

                {/* Game Instructions Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.h3
                    className="font-bold text-xl mb-2 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <motion.span
                      role="img"
                      aria-label="Game Controller"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      🎮
                    </motion.span>
                    Game Instructions
                  </motion.h3>
                  <motion.ol
                    className="list-decimal list-inside space-y-2 pl-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    {gameInstructions.map(
                      (instruction: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.9 + index * 0.1,
                          }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          {instruction}
                        </motion.li>
                      )
                    )}
                  </motion.ol>
                </motion.div>

                {/* Character Reference Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <motion.h3
                    className="font-bold text-xl mb-2 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    <motion.span
                      role="img"
                      aria-label="Camera"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      📸
                    </motion.span>
                    Character Reference
                  </motion.h3>
                  <motion.div
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.5 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <motion.p
                      className="text-gray-700 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.6 }}
                    >
                      Here's a visual reference of all the characters you need
                      to find:
                    </motion.p>
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.7 }}
                    >
                      <motion.img
                        src="/where-is-waldo-characters.png"
                        alt="Where's Waldo characters reference showing Waldo, Odlaw, Wenda, Woof, and Wizard Whitebeard"
                        className="max-w-full h-auto rounded-lg shadow-md"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Character Descriptions Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                >
                  <motion.h3
                    className="font-bold text-xl mb-3 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.9 }}
                  >
                    <motion.span
                      role="img"
                      aria-label="Eyes"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 2.0 }}
                    >
                      👀
                    </motion.span>
                    Character Descriptions & Tips
                  </motion.h3>
                  <div className="space-y-4">
                    {characters.map((character: Character, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 2.1 + index * 0.1 }}
                        whileHover={{
                          x: 5,
                          backgroundColor: "rgba(0, 0, 0, 0.02)",
                          transition: { duration: 0.2 },
                        }}
                        className="p-2 rounded-lg transition-colors"
                      >
                        <motion.h4
                          className="font-semibold text-lg mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 2.2 + index * 0.1,
                          }}
                        >
                          {character.name}:
                        </motion.h4>
                        <motion.ul
                          className="list-disc list-inside space-y-0.5 pl-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 2.3 + index * 0.1,
                          }}
                        >
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 2.4 + index * 0.1,
                            }}
                          >
                            <span className="font-medium">Signature Look:</span>{" "}
                            {character.signatureLook}
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 2.5 + index * 0.1,
                            }}
                          >
                            <span className="font-medium">Other Details:</span>{" "}
                            {character.otherDetails}
                          </motion.li>
                        </motion.ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Important Notes Section */}
                <motion.div
                  className="mt-6 pt-4 border-t"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                >
                  <motion.h4
                    className="font-semibold text-lg mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.9 }}
                  >
                    Important Notes:
                  </motion.h4>
                  <motion.ul
                    className="list-disc list-inside space-y-1 pl-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.0 }}
                  >
                    {importantNotes.map((note: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 3.1 + index * 0.1 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        {note}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HowToPlayModal;
