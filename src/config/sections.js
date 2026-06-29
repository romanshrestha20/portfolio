import Navbar from "../components/navbar/Navbar";
import About from "../components/about/About";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";

export const sections = [
  { id: "navbar", Component: Navbar, delay: 0.1 },
  { id: "about", Component: About, delay: 0.3 },
  { id: "projects", Component: Projects, delay: 0.5 },
  { id: "skills", Component: Skills, delay: 0.7 },
  { id: "contact", Component: Contact, delay: 0.9 },
  { id: "footer", Component: Footer, delay: 1.1 },
];
