import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
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

// Error Boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error loading component. Please try again later.</div>;
    }

    return this.props.children;
  }
}

function App() {
  // Manage the delay of the lazy-loaded components
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay the loading by 0.5 seconds after the component is mounted
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App dark:bg-gray-800">
      <ErrorBoundary>
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
          {/* Delay for Navbar */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }} // 0.5 second delay
            >
              <Navbar />
            </motion.div>
          )}

          {/* Delay for About */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }} // 0.5 second delay
            >
              <About />
            </motion.div>
          )}

          {/* Delay for Projects */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }} // 0.5 second delay
            >
              <Projects />
            </motion.div>
          )}

          {/* Delay for Skills */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }} // 0.5 second delay
            >
              <Skills />
            </motion.div>
          )}

          {/* Delay for Contact */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }} // 0.5 second delay
            >
              <Contact />
            </motion.div>
          )}

          {/* Delay for Footer */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }} // 0.5 second delay
            >
              <Footer />
            </motion.div>
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
