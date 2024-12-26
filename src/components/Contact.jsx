import React, { useState } from "react";
import emailjs from "emailjs-com";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import ChatIcon from "@mui/icons-material/Chat";
import { motion } from "framer-motion";

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <CircularProgress className="text-gray-900 dark:text-white" size={24} />
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required." : "";
      case "email":
        return /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Please enter a valid email address.";
      case "message":
        return value.trim() === "" ? "Message is required." : "";
      default:
        return "";
    }
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    const errors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };

    setFormErrors(errors);

    // Check for errors
    if (Object.values(errors).some((error) => error !== "")) {
      setFormStatus("Please fix the errors above.");
      return;
    }

    setIsLoading(true);
    setFormStatus("Sending...");

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        () => {
          setFormStatus("Email sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setFormErrors({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("FAILED:", error);
          setFormStatus("Failed to send email.");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-primary dark:text-blue-500">
            Contact Me
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-2">
            I'd love to hear from you! Fill out the form below.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <Box mb={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Your Name"
                required
                error={!!formErrors.name}
                helperText={formErrors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className="text-gray-600 dark:text-gray-300" />
                    </InputAdornment>
                  ),
                  style: { color: "inherit" },
                }}
                InputLabelProps={{
                  className: "text-gray-900 dark:text-white",
                }}
              />
            </Box>

            {/* Email Field */}
            <Box mb={2}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Your Email"
                required
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon className="text-gray-600 dark:text-gray-300" />
                    </InputAdornment>
                  ),
                  style: { color: "inherit" },
                }}
                InputLabelProps={{
                  className: "text-gray-900 dark:text-white",
                }}
              />
            </Box>

            {/* Message Field */}
            <Box mb={2}>
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Your Message"
                multiline
                rows={4}
                required
                error={!!formErrors.message}
                helperText={formErrors.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ alignSelf: "flex-start", marginTop: "2px" }}
                    >
                      <ChatIcon className="text-gray-600 dark:text-gray-300" />
                    </InputAdornment>
                  ),
                  style: { color: "inherit" },
                }}
                InputLabelProps={{
                  className: "text-gray-900 dark:text-white",
                }}
              />
            </Box>

            {/* Form Status */}
            {formStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-center mt-4 ${
                  formStatus.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formStatus}
              </motion.p>
            )}

            {/* Submit Button */}
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
      </div>
    </section>
  );
};

export default Contact;
