import { lazy } from 'react';

export const sections = [
  { id: 'navbar', Component: lazy(() => import('../components/navbar/Navbar')), delay: 0.1 },
  { id: 'about', Component: lazy(() => import('../components/about/About')), delay: 0.3 },
  { id: 'projects', Component: lazy(() => import('../components/projects/Projects')), delay: 0.5 },
  { id: 'skills', Component: lazy(() => import('../components/skills/Skills')), delay: 0.7 },
  { id: 'contact', Component: lazy(() => import('../components/contact/Contact')), delay: 0.9 },
  { id: 'footer', Component: lazy(() => import('../components/footer/Footer')), delay: 1.1 },
];
