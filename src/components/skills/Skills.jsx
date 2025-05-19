import { motion } from "framer-motion";
import SkillItem from "./SkillItem";
import SectionHeader from "../common/SectionHeader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const skills = [
  {
    iconClass: "fab fa-react",
    color: "text-blue-600 dark:text-blue-400",
    name: "React",
  },
  {
    iconClass: "fab fa-js-square",
    color: "text-yellow-600 dark:text-yellow-400",
    name: "JavaScript",
  },
  {
    iconClass: "fab fa-node",
    color: "text-green-600 dark:text-green-400",
    name: "Node.js",
  },
  {
    iconClass: "fab fa-java",
    color: "text-red-600 dark:text-red-400",
    name: "Java",
  },
  {
    iconClass: "fab fa-python",
    color: "text-green-600 dark:text-green-400",
    name: "Python",
  },
  {
    iconClass: "fab fa-linux",
    color: "text-black dark:text-gray-300",
    name: "Linux",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 bg-background dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader title="My Skills" subtitle="Technologies I work with" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto"
        >
          {skills.map((skill, index) => (
            <SkillItem key={index} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
