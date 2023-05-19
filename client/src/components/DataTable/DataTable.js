import React from "react";

import MUIDataTable from "mui-datatables";

export default function DataTable({ columns, rows }) {
  return <MUIDataTable columns={columns} data={rows} />;
}
