import {useState,useEffect,useContext} from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Table.css";
import authContext from '../../context/auth/AuthContext';
import AdminContext from '../../context/admin/AdminContext';
import TablePagination from "@material-ui/core/TablePagination";
 

const UsersTable = ({setId}) => {
  const { getAllUsers, users, orderListLoading } = useContext(AdminContext);
 
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
       console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    
     useEffect(() => {
       getAllUsers();
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
      <h3>Users</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>

              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {users &&
              users.length > 0 &&
              users
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
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left" className="Details" onClick={()=>setId(row._id)}>
                      Details
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {users && users.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}

export default UsersTable

