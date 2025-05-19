import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import SectionHeader from "../common/SectionHeader";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Get In Touch"
            subtitle="Have a question or want to work together?  Drop me a message below!"
          />
        </motion.div>
        <br />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
