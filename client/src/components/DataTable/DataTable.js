import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function DataTable({ columns, rows }) {
  const theme = createTheme({
    components: {
      // MUIDataTableBodyCell: {
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: "#FF0000",
      //     },
      //   },
      // },
      MuiTableRow: {
        styleOverrides: {
          root: {
            // backgroundColor: "#00FF00",
            // height: "50px",
            // height: 30,
            // minHeight: "30px",
            // maxHeight: "30px",
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
          responsive: "standard",
          // responsive: "simple",
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
