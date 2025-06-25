
import { motion } from "framer-motion";

export default function AboutText() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-grow md:px-12"
    >
      <p className="font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
        Hello! My name is{" "}
        <strong className="text-primary dark:text-blue-400">
          Roman Shrestha
        </strong>
        . I thrive on solving real-world problems and staying ahead with
        emerging technologies.
      </p>
      <p className="mt-6 font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
        I have experience working with{" "}
        <strong className="text-primary dark:text-blue-400">
          Java, JavaScript, React, Python, and Linux
        </strong>
        . I’m currently seeking opportunities in software engineering and web
        development where I can contribute to meaningful projects.
      </p>
      <p className="mt-6 font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
        Outside of coding, I enjoy engaging in{" "}
        <strong className="text-green-600 dark:text-green-400">football</strong>{" "}
        and{" "}
        <strong className="text-primary dark:text-blue-400">traveling</strong>.
        Football keeps me active and teaches the importance of teamwork, while
        traveling provides new perspectives and inspires my creativity.
      </p>
    </motion.div>
  );
}
