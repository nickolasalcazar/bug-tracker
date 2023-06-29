import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const onRowClick = (rowData, rowMeta) => {
    // console.log("rowData", rowData, "rowMeta", rowMeta);
    const id = rowData[0];
    navigate(`/dashboard/task/${id}`);
    if (handleOnRowClick) handleOnRowClick();
  };

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        columns={columns}
        data={rows}
        options={{
          elevation: 1,
          draggableColumns: { enabled: true },
          onRowClick: (rowData, rowMeta) => {
            onRowClick(rowData, rowMeta);
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
