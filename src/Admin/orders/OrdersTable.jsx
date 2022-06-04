import React, { useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Table.css";
import authContext from "../../context/auth/AuthContext";
import AdminContext from "../../context/admin/AdminContext";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import moment from "moment";

const makeStyle = (status) => {
  if (status === "Approved" || status) {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending" || !status) {
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
const UsersTable = () => {
  const { getAllUsers, users, orderListLoading ,   getAllOrdersForAdmin,
    adminOrders, } = useContext(AdminContext);
  const { userData } = useContext(authContext);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllOrdersForAdmin();
    //    if (userData) {
    //      if (userData.isAdmin === false) {
    //     history.push("/");
    //      }
    //    }
    //    if (!userData) {
    //      props.history.push("/");
    //    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="Table">
      <h3>Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Paid</TableCell>
              <TableCell align="left">isPaid</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {adminOrders &&
              adminOrders.length > 0 &&
              adminOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row._id}</TableCell>
                    <TableCell align="left">
                      {moment(row.createdAt).format("DD-MM-YYYY, HH:MM:SS A")}
                    </TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(row.status)}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell align="left">{row.totalPrice}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <span className="status" style={makeStyle(row.isPaid)}>
                        {String(row.isPaid)}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/order/${row._id}`} className="Details">
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {adminOrders && adminOrders.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10,15]}
          component="div"
          count={adminOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default UsersTable;
