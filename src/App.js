import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import NotFound from './components/NotFound'; // Import NotFound component

function App() {
  return (
    <div className="App dark:bg-gray-800 w-full overflow-x-hidden">
      <Router>
        <Routes>
          {/* Route for Home */}
          <Route path="/" element={<Home />} />
          
          {/* Catch-all route for unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
