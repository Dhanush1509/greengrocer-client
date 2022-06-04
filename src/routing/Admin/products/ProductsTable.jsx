import { useState, useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Table.css";
import authContext from "../../../context/auth/AuthContext";
import AdminContext from "../../../context/admin/AdminContext";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  container: {
    height: 500,
  },
});

const ProductsTable = ({setId}) => {
  const classes = useStyles();
  const { getAllProductsForAdmin, productsForAdmin } = useContext(AdminContext);
  const { userData } = useContext(authContext);

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    if (userData) getAllProductsForAdmin();
  }, []);
  return (
    <div className="Table">
      <h3>Products</h3>
      {productsForAdmin && productsForAdmin.length > 0 && (
        <>
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Image</TableCell>
                    
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>View</TableCell>
                  </>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsForAdmin
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={order._id}
                      onClick={()=>setId(order._id)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "2px",
                          }}
                          src={order.image}
                          alt={order.name}
                        />
                      </TableCell>

                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.category}</TableCell>
                      <TableCell>{order.countInStock}</TableCell>

                      <TableCell align="left">
                        <Link to={`/products/${order._id}`} className="Details">
                          Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productsForAdmin.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductsTable;
