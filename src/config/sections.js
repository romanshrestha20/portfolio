import { lazy } from 'react';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export const sections = [
  { id: 'navbar', Component: lazy(() => import('../components/Navbar')), delay: 0.1 },
  { id: 'about', Component: lazy(() => import('../components/About')), delay: 0.3 },
  { id: 'projects', Component: lazy(() => import('../components/Projects')), delay: 0.5 },
  { id: 'skills', Component: Skills, delay: 0.7 },
  { id: 'contact', Component: Contact, delay: 0.7 },
  { id: 'footer', Component: Footer, delay: 0.7 },
];
