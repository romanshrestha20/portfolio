import React, { Suspense, lazy } from "react";
import { sections } from "../config/sections";
import Navbar from "./Navbar"; // Keep Navbar outside of lazy if used immediately

const Home = () => {
  return (
    <div className="Home dark:bg-gray-800 w-full overflow-x-hidden">
      <Suspense
        fallback={
          <div className="min-h-screen dark:bg-gray-800 bg-gray-100 flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold dark:text-blue-400 text-blue-600 mb-4 animate-pulse">
                Welcome to My Portfolio!
              </h1>
              <div className="border-t-4 border-blue-600 dark:border-blue-400 border-solid w-16 h-16 rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="font-mono text-lg dark:text-blue-300 text-blue-500">
                Please wait while we load the content...
              </p>
            </div>
          </div>
        }
      >
        <Navbar />

        {sections.map(({ id, component: Component, delay }) => (
          <div
            key={id}
            id={id}
            className={`transition-opacity opacity-0 animate-fadeIn delay-[${
              delay * 1000
            }ms]`}
          >
            <Component />
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default Home;
