import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react"; // Import the arrow icon

const projects = [
  {
    name: "Django Blog",
    description:
      "A web app for creating, reading, updating, and deleting blog posts with user authentication and profiles.",
    image:
      "https://github.com/romanshrestha20/portfolio/blob/main/public/Screenshot_25-12-2024_11926_127.0.0.1.jpeg?raw=true",
    link: "https://github.com/romanshrestha20/django-blog",
  },
  {
    name: "AWAP Movie Application",
    description:
      "Keeps users updated with the latest movies and TV shows, featuring popular and trending titles.",
    image:
      "https://github.com/romanshrestha20/portfolio/blob/main/public/Screenshot_25-12-2024_0462_mango-rock-0b5b48e10.5.azurestaticapps.net.jpeg?raw=true",
    link: "https://github.com/AWAP-Group8-2024/Movie-App.git",
  },
  {
    name: "Another Project",
    description:
      "Another example description, which is short and doesn't need an expand option.",
    image: "https://plus.unsplash.com/premium_photo-1682656220562-32fde8256295?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/your-profile/project-repo",
  },
];

const Projects = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle expansion
  };

  return (
    <section
      id="projects"
      className="py-16 bg-background dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary dark:text-blue-400">
            My Projects
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-2">
            Explore some of the work I've done
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
              className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300"
            >
              {/* Project Image with hover effect */}
              <motion.img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg transition-transform transform hover:scale-110"
                whileHover={{ scale: 1.1 }}
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {expanded === index
                    ? project.description
                    : project.description.slice(0, 60) + "..."}
                </p>
                {project.description.length > 60 && (
                  <div className="mt-4 flex items-center space-x-2 cursor-pointer">
                    <span
                      onClick={() => toggleExpand(index)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {expanded === index ? "Show Less" : "Read More"}
                    </span>
                    <ArrowDown
                      className={`h-5 w-5 ${
                        expanded === index ? "transform rotate-180" : ""
                      } transition-transform`}
                    />
                  </div>
                )}
                <div className="mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
