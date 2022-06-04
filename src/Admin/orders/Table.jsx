import {useContext,useEffect,useState}from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Table.css";
import axios from "axios"
import {Link} from "react-router-dom"
import setAuthToken from "../../utils/setAuthToken";
import authContext from "../../context/auth/AuthContext";
import moment from "moment";


const makeStyle=(status)=>{
  if(status === 'Approved'||status)
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending'||!status)
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }

  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}


export default function BasicTable() {
const {userData}=useContext(authContext)
const [orders,setOrders]=useState([])
const getOrders = async () => {
 
  setAuthToken(userData?.token);

  try {
    const { data } = await axios.get(
      `${
        process.env.NODE_ENV == "production"
          ? process.env.REACT_APP_URL
          : process.env.REACT_APP_DEV_URL
     }orders/recentOrders`);
    console.log(data);
    setOrders(data.orders)
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
 setAuthToken(userData?.token);
getOrders()
}, []);
  return (
    orders &&
    orders.length > 0 && (
      <div className="Table">
        <h3>Recent Orders</h3>
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
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {orders.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.orderedItemsData.map((c) => c.id.name).join(",")}
                  </TableCell>
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
      </div>
    )
  );

}
