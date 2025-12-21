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
      className="overflow-hidden transition-all duration-300 transform rounded-lg shadow-lg bg-surface-light dark:bg-surface-dark"
    >
      <img
        src={project.image}
        alt={project.name}
        className="object-cover w-full rounded-t-lg aspect-video"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/600x400"; // <-- Replace with your fallback image path
        }}
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
          {project.name}
        </h3>
        <p className="mt-2 text-textSecondary-light dark:text-textSecondary-dark">
          {expanded
            ? project.description
            : project.description.length > 60
            ? project.description.slice(0, 60) + "..."
            : project.description}
        </p>
        {project.description.length > 60 && (
          <div
            className="flex items-center mt-4 space-x-2 cursor-pointer"
            onClick={toggleExpand}
          >
            <span className="text-primary-light dark:text-primary-dark hover:underline">
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
            className="text-primary-light dark:text-primary-dark hover:underline"
          >
            View Project
          </a>
        </div>
      </div>
    </motion.div>
  );
}
