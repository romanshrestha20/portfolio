import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import SectionHeader from "../common/SectionHeader";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full py-20 text-text-light bg-background-light dark:bg-background-dark dark:text-text-dark"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Get In Touch"
            subtitle={
              <>
                Have a question or want to work together? <br />
                Drop me a message below!
              </>
            }
          />
        </motion.div>
        <br />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
