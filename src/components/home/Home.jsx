import React, { Suspense } from "react";
import { sections } from "../../config/sections";
import Loader from "../common/Loader";
import SectionWrapper from "../common/SectionWrapper";

const Home = () => {
 return (
    <div className="Home dark:bg-gray-800 w-full overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        {sections.map(({ id, Component, delay }) => (
          <SectionWrapper key={id} id={id} delay={delay}>
            <Component />
          </SectionWrapper>
        ))}
      </Suspense>
    </div>
  );

};

export default Home;
