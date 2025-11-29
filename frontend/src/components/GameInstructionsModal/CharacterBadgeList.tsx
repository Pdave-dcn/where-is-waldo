import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { getCharacterEmoji } from "@/utils/characterInfoModalUtils";

interface CharacterBadgeListProps {
  characters: string[];
}

export const CharacterBadgeList = ({ characters }: CharacterBadgeListProps) => {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {characters.map((character, index) => (
        <motion.div
          key={character}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.6 + index * 0.1,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 },
          }}
        >
          <Badge
            variant="outline"
            className="text-lg py-2 px-3 border cursor-pointer"
          >
            <motion.span
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              {getCharacterEmoji(character)}
            </motion.span>{" "}
            {character}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};
