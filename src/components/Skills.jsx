import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="skills"
      className="py-16 bg-background dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary dark:text-blue-500 mb-4 font-poppins">
            My Skills
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
            Technologies I work with
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto"
        >
          {/* Skill Items */}
          {[
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
          ].map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                y: [-5, 0, -5], // Bounce effect
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
              <motion.i
                className={`${skill.iconClass} text-5xl ${skill.color}`}
              ></motion.i>
              <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
