import React from "react";
import "./App.css";
import { sections } from "./config/sections";
import SectionWrapper from "./components/common/SectionWrapper";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <div className="App dark:bg-gray-800 w-full overflow-x-hidden">
      <ErrorBoundary>
        {sections.map(({ id, Component, delay }) => (
          <SectionWrapper key={id} delay={delay}>
            <Component />
          </SectionWrapper>
        ))}
      </ErrorBoundary>
    </div>
  );
}

export default App;
