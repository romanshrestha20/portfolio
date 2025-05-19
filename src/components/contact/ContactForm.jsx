import React, { useState } from "react";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import ContactInput from "./ContactInput";
import Spinner from "../common/Spinner";

import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import ChatIcon from "@mui/icons-material/Chat";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required." : "";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email address.";
      case "message":
        return value.trim() === "" ? "Message is required." : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((err) => err !== "")) {
      setFormStatus("Please fix the errors above.");
      return;
    }

    setIsLoading(true);
    setFormStatus("Sending...");

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(() => {
        setFormStatus("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("FAILED:", error);
        setFormStatus("Failed to send email.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
    >
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <ContactInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            error={formErrors.name}
            helperText={formErrors.name}
            icon={<PersonIcon className="text-gray-600 dark:text-gray-300" />}
          />
        </Box>

        <Box mb={2}>
          <ContactInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            error={formErrors.email}
            helperText={formErrors.email}
            icon={<MailIcon className="text-gray-600 dark:text-gray-300" />}
          />
        </Box>

        <Box mb={2}>
          <ContactInput
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            error={formErrors.message}
            helperText={formErrors.message}
            icon={<ChatIcon className="text-gray-600 dark:text-gray-300" />}
            multiline
            rows={4}
          />
        </Box>

        {formStatus && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center mt-4 ${
              formStatus.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {formStatus}
          </motion.p>
        )}

        <div className="flex justify-center mt-6">
          <motion.button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
            disabled={isLoading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? <Spinner /> : "Send Message"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
