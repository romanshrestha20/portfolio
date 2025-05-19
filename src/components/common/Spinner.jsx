// components/common/Spinner.jsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <CircularProgress className="text-gray-900 dark:text-white" size={24} />
  </div>
);

export default Spinner;