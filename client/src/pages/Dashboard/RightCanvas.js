import React from "react";
import { Container, Paper } from "@mui/material";

/**
 * Renders the canvas that appears on the righthand side of the dashboard.
 */
export default function RightCanvas({ children }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Container>{children}</Container>
    </Paper>
  );
}
