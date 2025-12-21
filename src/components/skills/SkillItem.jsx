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
      className="text-center transition-transform transform"
    >
      <motion.i className={`${iconClass} text-5xl ${color}`}></motion.i>
      <p className="mt-2 font-mono text-xl text-text-light dark:text-text-dark">
        {name}
      </p>
    </motion.div>
  );
}
