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
    color: "text-primary-light dark:text-primary-dark",
    name: "React",
  },
  {
    iconClass: "fab fa-js-square",
    color: "text-accent-light dark:text-accent-dark",
    name: "JavaScript",
  },
  {
    iconClass: "fab fa-node",
    color: "text-success-light dark:text-success-dark",
    name: "Node.js",
  },
  {
    iconClass: "fab fa-java",
    color: "text-danger-light dark:text-danger-dark",
    name: "Java",
  },
  {
    iconClass: "fab fa-python",
    color: "text-info-light dark:text-info-dark",
    name: "Python",
  },
  {
    iconClass: "fab fa-linux",
    color: "text-secondary dark:text-text-dark",
    name: "Linux",
  },
  {
    iconClass: "fas fa-fire",
    color: "text-accent-dark dark:text-accent-light",
    name: "Firebase",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 text-text-light bg-background-light dark:bg-background-dark dark:text-text-dark"
    >
      <div className="container max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <SectionHeader title="My Skills" subtitle="Technologies I work with" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid justify-center grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill, index) => (
            <SkillItem key={index} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
