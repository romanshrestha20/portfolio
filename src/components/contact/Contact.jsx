import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import SectionHeader from "../common/SectionHeader";

const Contact = () => {
  return (
    <section
      id="contact"
      className="section-frame w-full bg-background-light py-14 text-text-light dark:bg-background-dark dark:text-text-dark sm:py-20"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Get In Touch"
            number="04"
            eyebrow="Letters Desk"
            subtitle={
              <>
                Have a question or want to work together? <br />
                Drop me a message below!
              </>
            }
          />
        </motion.div>
        <div className="mt-8 sm:mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
