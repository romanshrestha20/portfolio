import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">My Projects</h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-2">
            Explore some of the work I've done
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Single Project Card */}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
          >
            <img src="/path/to/project-image.jpg" alt="Project" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project Name</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A brief description of what this project is about. Highlight key features or technologies used.
              </p>
              <div className="mt-4">
                <a
                  href="https://github.com/your-profile/project-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div><motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
          >
            <img src="/path/to/project-image.jpg" alt="Project" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project Name</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A brief description of what this project is about. Highlight key features or technologies used.
              </p>
              <div className="mt-4">
                <a
                  href="https://github.com/your-profile/project-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div><motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
          >
            <img src="/path/to/project-image.jpg" alt="Project" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project Name</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A brief description of what this project is about. Highlight key features or technologies used.
              </p>
              <div className="mt-4">
                <a
                  href="https://github.com/your-profile/project-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div>

          {/* Repeat for other projects */}
        
        </div>
      </div>
    </section>
  );
};

export default Projects;
