// Example React component
import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">My Skills</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Technologies I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {/* Example of Font Awesome Icon usage */}
          <div className="text-center">
            <i className="fab fa-react text-5xl text-blue-600 dark:text-blue-400"></i>
            <p className="text-xl mt-2 text-gray-800 dark:text-gray-100">React</p>
          </div>
          <div className="text-center">
            <i className="fab fa-js-square text-5xl text-yellow-600 dark:text-yellow-400"></i>
            <p className="text-xl mt-2 text-gray-800 dark:text-gray-100">JavaScript</p>
          </div>
          <div className="text-center">
            <i className="fab fa-node text-5xl text-green-600 dark:text-green-400"></i>
            <p className="text-xl mt-2 text-gray-800 dark:text-gray-100">Node.js</p>
          </div>
          <div className="text-center">
            <i className="fab fa-docker text-5xl text-blue-400 dark:text-blue-600"></i>
            <p className="text-xl mt-2 text-gray-800 dark:text-gray-100">Docker</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
