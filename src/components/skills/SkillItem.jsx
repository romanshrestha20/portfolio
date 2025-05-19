import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SkillItem({ iconClass, color, name }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.1,
        y: [-5, 0, -5],
        transition: {
          y: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 0.4,
          },
          scale: { duration: 0.3 },
        },
      }}
      whileTap={{ scale: 0.9 }}
      className="text-center transform transition-transform"
    >
      <motion.i className={`${iconClass} text-5xl ${color}`}></motion.i>
      <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
        {name}
      </p>
    </motion.div>
  );
}
