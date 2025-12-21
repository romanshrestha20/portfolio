import SectionHeader from "../common/SectionHeader";
import ProjectCard from "./ProjectCard";

const projects = [
 {
    name: "Hamro Pasal",
    description:
      "An e-commerce platform for buying and selling products online with secure transactions and user-friendly interface.",
    image:
      "https://github.com/romanshrestha20/portfolio/blob/main/public/hamro-pasal.png?raw=true",
    link: "https://hamro-pasal-frontend-1dqm.vercel.app/",
  },
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
  {
    name: "CleanSync",
    description:
      "CleanSync is a modern Android app built with Kotlin and Jetpack Compose, designed for seamless user management, booking services, and notifications.",
    image: "https://github.com/Mobile-Development-Project-Group-22/CleanSync/blob/main/Screenshot_20250428_135436.png?raw=true",
    link: "https://github.com/Mobile-Development-Project-Group-22/CleanSync/",
  },
 
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 text-gray-900 bg-background dark:bg-gray-900 dark:text-white"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <SectionHeader title="My Projects" subtitle="Explore some of the work I've done" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
