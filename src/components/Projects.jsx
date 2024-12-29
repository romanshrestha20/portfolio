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
    name: "Movie Application",
    description:
      "Keeps users updated with the latest movies and TV shows, featuring popular and trending titles.",
    image:
      "https://github.com/romanshrestha20/portfolio/blob/main/public/Screenshot_25-12-2024_0462_mango-rock-0b5b48e10.5.azurestaticapps.net.jpeg?raw=true",
    link: "https://github.com/AWAP-Group8-2024/Movie-App.git",
  },
  {
    name: "My Book Library",
    description:
      "A web app for managing books and authors, including adding, viewing, editing, and deleting records, with user authentication and profiles for personalized experiences.",
    image:
      "https://github.com/romanshrestha20/portfolio/blob/main/public/Screenshot_29-12-2024_123130_localhost.jpeg?raw=true",
    link: "https://github.com/romanshrestha20/my-book-library",
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
          <h2 className="text-4xl font-extrabold text-primary dark:text-blue-500">
            My Projects
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-2">
            Explore some of the work I've done
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {expanded === index
                    ? project.description
                    : project.description.length > 60
                    ? project.description.slice(0, 60) + "..."
                    : project.description}
                </p>
                {project.description.length > 60 && (
                  <div
                    className="mt-4 flex items-center space-x-2 cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <span className="text-blue-600 dark:text-blue-400 hover:underline">
                      {expanded === index ? "Show Less" : "Read More"}
                    </span>
                    <ArrowDown
                      className={`h-5 w-5 transform transition-transform ${
                        expanded === index ? "rotate-180" : ""
                      }`}
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
