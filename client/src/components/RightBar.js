import React from "react";
import { Container, Paper, Typography } from "@mui/material";

export default function RightBar({ children }) {
  return (
    <Paper sx={{ height: 720, minWidth: 200 }}>
      <Container>
        <Typography>Right Bar</Typography>
        {children}
      </Container>
    </Paper>
  );
}
