import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Table.css";

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable({
  headersForLatestOrders,
  rowsForLatestOrders,
}) {
  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headersForLatestOrders.map((c, index) =>
                index === 0 || index === headersForLatestOrders.length - 1 ? (
                  <TableCell>{c}</TableCell>
                ) : (
                  <TableCell align="left">{c}</TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rowsForLatestOrders.map((row) => (
              <TableRow
                key={row[headersForLatestOrders[0]]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row[headersForLatestOrders[0]]}
                </TableCell>
                <TableCell align="left">
       
                  {row[headersForLatestOrders[1]]}
                </TableCell>
                <TableCell align="left">

                  {row[headersForLatestOrders[2]]}
                </TableCell>
                <TableCell align="left">
                  <span
                    className="status"
                    style={makeStyle(row[headersForLatestOrders[3]])}
                  >
                    {row[headersForLatestOrders[3]]}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
