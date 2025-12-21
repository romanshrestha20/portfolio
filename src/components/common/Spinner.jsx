// components/common/Spinner.jsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => (
  <div className="flex items-center justify-center">
    <CircularProgress
      className="text-primary-light dark:text-primary-dark"
      size={24}
    />
  </div>
);

export default Spinner;