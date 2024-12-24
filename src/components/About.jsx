import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 font-poppins">
            About Me 
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
            Get to know me better 🌟
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Section: Profile Image and CV Download */}
          <div className="flex flex-col items-center w-full md:w-1/3 mb-8 md:mb-0">
            {/* Profile Image */}
            <img
              src="/images/profile.jpg" // Ensure the image path is correct
              alt="Profile Picture"
              className="w-56 h-56 rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-lg mb-6 transition-transform transform hover:scale-105"
            />
            <a
              href="https://drive.google.com/file/d/1edylUMY-0jSeB2pjS3OVT_3Uky5qDjI4/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-3 mb-6"
              aria-label="Download CV"
            >
              <FiDownload className="h-5 w-5" />
              <span>Download My CV </span>
            </a>
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://www.linkedin.com/in/roman-shrestha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="h-8 w-8" />
              </a>
              <a
                href="https://github.com/romanshrestha20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition"
                aria-label="GitHub Profile"
              >
                <FaGithub className="h-8 w-8" />
              </a>
              <a
                href="https://www.instagram.com/roman_shrestha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 hover:text-pink-700 transition"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Right Section: About Text */}
          <div className="w-full md:w-2/3 px-6 md:px-12">
            <div className="mb-10">
              <p className="font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
                Hi! I'm <strong className="text-blue-600 dark:text-blue-400">Roman Shrestha</strong> 👋, and I’m passionate about
                solving problems 💡 and exploring new technologies 🚀. I’ve worked with{" "}
                <strong className="text-blue-600 dark:text-blue-400">Java, JavaScript, React, Python, and Linux</strong>, and
                I’m always excited to learn and grow in the tech world 💻.
              </p>
            </div>
            <div>
              <p className="mt-6 font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
                When I’m not coding, I love spending time on <strong className="text-green-600 dark:text-green-400">football ⚽</strong> and{" "}
                <strong className="text-blue-600 dark:text-blue-400">traveling 🌍</strong>. Football keeps me active 🏃‍♂️ and teaches me the value of teamwork 🤝,
                while traveling helps me gain fresh perspectives ✈️ and inspire my creative side 🎨. I believe in finding a healthy
                balance between work and personal passions 🧘‍♂️.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
