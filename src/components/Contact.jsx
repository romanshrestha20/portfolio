import React, { useState } from "react";
import emailjs from "emailjs-com";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import ChatIcon from "@mui/icons-material/Chat";

// Spinner component with dark mode adaptation
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

  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setFormStatus("All fields are required.");
      return;
    }

    setIsLoading(true);
    setFormStatus("Sending...");

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { name, email, message }, // Ensure correct data format
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        () => {
          setFormStatus("Email sent successfully!");
          setFormData({ name: "", email: "", message: "" });
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
      className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            Contact Me
          </h2>
          <p className=" font-mono text-lg text-gray-600 dark:text-gray-300 mt-2">
            I'd love to hear from you! Fill out the form below.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
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

            {formStatus && (
              <p
                className={`text-center mt-4 ${
                  formStatus.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formStatus}
              </p>
            )}

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner />
                ) : formStatus.includes("success") ? (
                  <svg
                    className="h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
