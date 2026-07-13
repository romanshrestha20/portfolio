import React from "react";
import "./App.css";
import { sections } from "./config/sections";
import SectionWrapper from "./components/common/SectionWrapper";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <div className="App w-full overflow-x-hidden bg-signal-bg text-signal-text">
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
