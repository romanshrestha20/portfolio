import React from "react";
import { sections } from "../../config/sections";
import SectionWrapper from "../common/SectionWrapper";

const Home = () => {
 return (
   <div className="w-full overflow-x-hidden Home bg-background-light dark:bg-background-dark">
     {sections.map(({ id, Component, delay }) => (
       <SectionWrapper key={id} id={id} delay={delay}>
         <Component />
       </SectionWrapper>
     ))}
   </div>
 );

};

export default Home;
