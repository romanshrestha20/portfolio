import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto">
          {/* First Row (3 skills) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fab fa-react text-5xl text-blue-600 dark:text-blue-400"></i>
            <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
              React
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fab fa-js-square text-5xl text-yellow-600 dark:text-yellow-400"></i>
            <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
              JavaScript
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fab fa-node text-5xl text-green-600 dark:text-green-400"></i>
            <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
              Node.js
            </p>
          </motion.div>
          {/* Second Row (3 skills) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fab fa-java text-5xl text-red-600 dark:text-red-400"></i>
            <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
              Java
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fab fa-python text-5xl text-green-600 dark:text-green-400"></i>
            <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
              Python
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <i className="fab fa-linux text-5xl text-black dark:text-gray-300"></i>
            <p className="font-mono text-xl mt-2 text-gray-800 dark:text-gray-100">
              Linux
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
