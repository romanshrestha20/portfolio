import { motion } from "framer-motion";

export default function AboutText() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-grow md:px-12"
    >
      <p className="font-serif text-xl leading-relaxed tracking-wide text-textSecondary-light dark:text-textSecondary-dark">
        Hello! My name is{" "}
        <strong className="text-primary-light dark:text-primary-dark">
          Roman Shrestha
        </strong>
        . I’m an aspiring{" "}
        <strong className="text-primary-light dark:text-primary-dark">
          software engineer and web developer
        </strong>{" "}
        currently pursuing a{" "}
        <strong className="text-primary-light dark:text-primary-dark">
          Bachelor’s degree (Aug 2023 – May 2027)
        </strong>
        . I thrive on solving real-world problems and staying ahead with
        emerging technologies.
      </p>

      <p className="mt-6 font-serif text-xl leading-relaxed tracking-wide text-textSecondary-light dark:text-textSecondary-dark">
        I have hands-on experience with{" "}
        <strong className="text-primary-light dark:text-primary-dark">
          Java, JavaScript, React, Python, and Linux
        </strong>
        . I’m actively seeking{" "}
        <strong className="text-primary-light dark:text-primary-dark">
          internships and projects
        </strong>{" "}
        where I can contribute and grow in{" "}
        <strong className="text-primary-light dark:text-primary-dark">
          software engineering and web development
        </strong>
        .
      </p>

      <p className="mt-6 font-serif text-xl leading-relaxed tracking-wide text-textSecondary-light dark:text-textSecondary-dark">
        Outside of coding, I enjoy{" "}
        <strong className="text-success-light dark:text-success-dark">football</strong>{" "}
        and{" "}
        <strong className="text-primary-light dark:text-primary-dark">traveling</strong>.
        Football keeps me active and sharpens my teamwork skills, while traveling
        broadens my perspective and sparks creativity.
      </p>
    </motion.div>
  );
}
