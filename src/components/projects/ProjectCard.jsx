import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <motion.div
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
    <img
  src={project.image}
  alt={project.name}
  className="w-full aspect-video object-cover rounded-t-lg"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400"; // <-- Replace with your fallback image path
  }}
/>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {project.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {expanded
            ? project.description
            : project.description.length > 60
            ? project.description.slice(0, 60) + "..."
            : project.description}
        </p>
        {project.description.length > 60 && (
          <div
            className="mt-4 flex items-center space-x-2 cursor-pointer"
            onClick={toggleExpand}
          >
            <span className="text-blue-600 dark:text-blue-400 hover:underline">
              {expanded ? "Show Less" : "Read More"}
            </span>
            <ArrowDown
              className={`h-5 w-5 transform transition-transform ${
                expanded ? "rotate-180" : ""
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
  );
}
