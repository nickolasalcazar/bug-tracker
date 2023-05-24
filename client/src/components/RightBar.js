import React from "react";
import { Container, Paper } from "@mui/material";

export default function RightBar({ children }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Container>{children}</Container>
    </Paper>
  );
}
