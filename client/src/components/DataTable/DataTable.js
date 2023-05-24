import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function DataTable({ columns, rows }) {
  const theme = createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            // backgroundColor: "#00FF00",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        columns={columns}
        data={rows}
        options={{
          elevation: 1,
          draggableColumns: { enabled: true },
          responsive: "standard",
          setTableProps: () => {
            return {
              size: "small",
            };
          },
        }}
      />
    </ThemeProvider>
  );
}
