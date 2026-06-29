import { motion } from "framer-motion";

export default function AboutText() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <p className="text-lg leading-8 text-textSecondary-light dark:text-textSecondary-dark sm:text-xl">
        I am{" "}
        <strong className="font-display text-[1.08em] uppercase tracking-[-0.05em] text-text-light dark:text-text-dark">
          Roman Shrestha
        </strong>
        , a software engineering student building web and mobile products with
        a strong bias toward clear layout, practical flows, and readable code.
      </p>

      <p className="mt-5 text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark sm:text-lg">
        My current work is centered around React interfaces, Django backends,
        API-driven products, and portfolio case studies that explain how I
        think through structure rather than only surface styling.
      </p>

      <p className="mt-5 text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark sm:text-lg">
        I am currently pursuing a Bachelor&apos;s degree from August 2023 to May
        2027 and actively looking for internships where I can contribute,
        learn faster, and build stronger product intuition in real teams.
      </p>
    </motion.div>
  );
}
