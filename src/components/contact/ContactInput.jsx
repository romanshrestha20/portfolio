import React from "react";
import { TextField, InputAdornment } from "@mui/material";


const ContactInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon,
  multiline = false,
  rows = 1,
}) => {

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      required
      error={!!error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={
              multiline ? { alignSelf: "flex-start", marginTop: "2px" } : {}
            }
          >
            {icon}
          </InputAdornment>
        ),
        style: { color: "inherit" },
      }}
      InputLabelProps={{
        className: "text-text-light dark:text-text-dark",
      }}
    />
  );
};

export default ContactInput;
