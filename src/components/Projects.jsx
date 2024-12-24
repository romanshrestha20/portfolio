import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react"; // Import the arrow icon

const projects = [
  {
    name: "Django Blog",
    description:
      "A web app for creating, reading, updating, and deleting blog posts with user authentication and profiles.",
    image:
      "https://raw.githubusercontent.com/romanshrestha20/portfolio/refs/heads/main/public/Screenshot_25-12-2024_11926_127.0.0.1.jpeg?token=GHSAT0AAAAAAC4J54EFIHYP5MKCMKRQUETGZ3LJ7NA",
    link: "https://github.com/romanshrestha20/django-blog",
  },
  {
    name: "AWAP Movie Application",
    description:
      "Keeps users updated with the latest movies and TV shows, featuring popular and trending titles.",
    image:
      "https://raw.githubusercontent.com/romanshrestha20/portfolio/refs/heads/main/public/Screenshot_25-12-2024_0462_mango-rock-0b5b48e10.5.azurestaticapps.net.jpeg?token=GHSAT0AAAAAAC4J54EENYEESB6NRI5QBYEIZ3LJZ7Q",
    link: "https://github.com/AWAP-Group8-2024/Movie-App.git",
  },
  {
    name: "Another Project",
    description:
      "Another example description, which is short and doesn't need an expand option.",
    image: "/images/profile.jpg",
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
      className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
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
