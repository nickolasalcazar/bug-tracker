import React from "react";
import { Paper } from "@mui/material";

/**
 * Wrapper component that adds a styled container around Task-related
 * components like Task and TaskForm.
 */
export default function TaskWrapper({ children }) {
  return (
    <Paper sx={{ m: { md: "auto", lg: "auto", xl: 0 }, maxWidth: 850 }}>
      {children}
    </Paper>
  );
}
