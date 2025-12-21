import React, { Suspense } from "react";
import { sections } from "../../config/sections";
import Loader from "../common/Loader";
import SectionWrapper from "../common/SectionWrapper";

const Home = () => {
 return (
   <div className="w-full overflow-x-hidden Home bg-background-light dark:bg-background-dark">
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
