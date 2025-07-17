import { motion } from "motion/react";

const Header = () => {
  return (
    <header className="bg-primary flex flex-col justify-center items-center py-8 text-primary-foreground">
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-5xl font-bold mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 400 },
          }}
        >
          WHERE'S WALDO?
        </motion.h1>

        <motion.p
          className="sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          The ultimate search and find challenge!
        </motion.p>
      </motion.div>
    </header>
  );
};

export default Header;
