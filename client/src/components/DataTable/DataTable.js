import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";

/**
 * Renders primary data table.
 *
 * NOTE: First column should always be the GUID of the task.
 *
 * @param {array}     columns
 * @param {array}     rows
 * @param {function}  handleOnRowClick
 */
export default function DataTable({
  columns,
  rows,
  handleOnRowClick = undefined,
}) {
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
          onRowClick: (rowData, rowMeta) => {
            console.log("rowData", rowData, "rowMeta", rowMeta);
            if (handleOnRowClick) handleOnRowClick();
          },
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
