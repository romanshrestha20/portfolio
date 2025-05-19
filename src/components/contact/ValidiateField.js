
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