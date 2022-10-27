import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
const { VITE_FONT } = import.meta.env;

const gridStyle = { minHeight: "100%", width: "100%", fontFamily: VITE_FONT };

const DataGrid = (props) => {
  return <ReactDataGrid dataSource={props.rows} style={gridStyle} {...props} />;
};
export default DataGrid;
