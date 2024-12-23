import { FaLinkedin, FaGithub } from "react-icons/fa"; // LinkedIn and GitHub icons
import { FiDownload } from "react-icons/fi";

function About() {
  return (
    <section
      id="about"
      className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            A little bit about who I am and what I do
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Profile Image */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <img
              src="/path/to/your/profile-image.jpg" // Update this with your image path
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-lg"
            />
          </div>

          {/* Right: Text Section */}
          <div className="w-full md:w-2/3">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Hello! I'm Roman Shrestha, a passionate student who loves to learn
              and build software. I have experience working with various
              technologies such as Java, JavaScript, React, Python, and Linux. 
              Currently, I'm honing my skills and seeking opportunities to apply
              my knowledge in real-world projects.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              In addition to programming, I am deeply passionate about football
              and travelling. These hobbies help me stay active, learn new
              perspectives, and bring fresh ideas to my work.
            </p>

            {/* Social Links and Resume Download */}
            <div className="flex justify-center mt-8 space-x-6">
              {/* Download CV Button */}
              <a
                href="https://drive.google.com/file/d/1edylUMY-0jSeB2pjS3OVT_3Uky5qDjI4/view?usp=drive_link" // Link to your CV
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all block text-center flex items-center space-x-2"
              >
                <FiDownload className="h-6 w-6 text-white" />
                <span>Download CV</span>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/roman-shrestha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition"
              >
                <FaLinkedin className="h-8 w-8" />
              </a>

              {/* GitHub Icon */}
              <a
                href="https://github.com/romanshrestha20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition"
              >
                <FaGithub className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
