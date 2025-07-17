import { X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsModal = ({ isOpen, onClose }: CreditsModalProps) => {
  const sections = [
    {
      title: "🎨 Original Creation",
      content:
        "Where's Waldo? was created by Martin Handford and first published in 1987.",
    },
    {
      title: "🖼️ Image",
      content: "Crowd scene image provided by WallpaperAccess website.",
    },
    {
      title: "⚡ Technology",
      content: [
        "Built with React & TypeScript",
        "Styled with Tailwind CSS",
        "Animations are made with Motion",
        "Icons by Lucide React",
        "Powered by Vite",
      ],
    },
    {
      title: "💝 Special Thanks",
      content:
        "To all the puzzle enthusiasts and Waldo fans who keep the search alive!",
    },
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
            className="bg-background rounded-lg shadow-xl max-w-md w-full"
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
            <div className="p-6">
              <motion.div
                className="flex justify-between items-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <motion.h2
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Credits
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="p-1 rounded-full cursor-pointer"
                    aria-label="Close credits"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </motion.div>
              </motion.div>

              <div className="space-y-4">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{
                      x: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      transition: { duration: 0.2 },
                    }}
                    className="p-2 rounded-lg transition-colors"
                  >
                    <motion.h3
                      className="font-semibold mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      {section.title}
                    </motion.h3>
                    {Array.isArray(section.content) ? (
                      <motion.ul
                        className="list-disc list-inside space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        {section.content.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.6 + index * 0.1 + itemIndex * 0.05,
                            }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        {section.content}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 pt-4 border-t text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <motion.p
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  Keep searching! 🔍
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreditsModal;
