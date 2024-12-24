import React, { Suspense, lazy } from 'react';
import './App.css';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Importing Google Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// Lazy-loaded components
const Navbar = lazy(() => import('./components/Navbar'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));

function App() {
  return (
    <div className="App dark:bg-gray-800">
      <Suspense
        fallback={
          <div className="min-h-screen dark:bg-gray-800 bg-gray-100 flex flex-col items-center justify-center">
            {/* Loading State */}
            <div className="text-center">
              <h1 className="text-4xl font-bold dark:text-blue-400 text-blue-600 mb-4 animate-pulse">
                Welcome to My Portfolio!
              </h1>
              {/* Spinner centered */}
              <div className="border-t-4 border-blue-600 dark:border-blue-400 border-solid w-16 h-16 rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="font-mono text-lg dark:text-blue-300 text-blue-500">Please wait while we load the content...</p>
            </div>
          </div>
        }
      >
        {/* Navbar remains visible and doesn't fade */}
        <Navbar />
        
        {/* About and Projects will fade in */}
        <div className="transition-opacity opacity-0 animate-fadeIn delay-500">
          <About />
        </div>
        <div className="transition-opacity opacity-0 animate-fadeIn delay-700">
          <Projects />
        </div>
        <div className="transition-opacity opacity-0 animate-fadeIn delay-700">
          <Skills />
        </div>
        <div className="transition-opacity opacity-0 animate-fadeIn delay-700">
          <Contact />
        </div>
        <div className="transition-opacity opacity-0 animate-fadeIn delay-700">
          <Footer />
        </div>
        
      </Suspense>
    </div>
  );
}

export default App;
