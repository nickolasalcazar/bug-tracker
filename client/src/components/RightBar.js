import React, { useContext } from "react";
import { Container, Paper } from "@mui/material";
import { DashboardContext } from "../AppLayout";

export default function RightBar({ children }) {
  const dashboardContext = useContext(DashboardContext);

  console.log("RightBar dashboardContext", dashboardContext);

  return (
    <Paper sx={{ p: 2 }}>
      <Container>{children}</Container>
    </Paper>
  );
}
