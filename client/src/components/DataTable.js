import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const testData = {
  columns: ["Name", "Company", "City", "State"],
  rows: [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ],
};

/**
 * Renders a data table.
 * @param {array} columns E.g. ['Task ID', 'Title', 'etc.']
 * @param {array} rows    E.g. [[row1], [row2]], [row3]]
 */
export default function DataTable({ columns, rows }) {
  // const [columns, setColumns] = useState([]);
  // const [rows, setRows] = useState([]);

  // rows.map((row) => {
  //   console.log(`row[${row[0]}]`);
  //   row.forEach((cell) => console.log("\tcell", cell));
  // });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="table">
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i} align="left">
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.map((cell, j) => (
                <TableCell key={i + "-" + j} align="left">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
