import React, { Fragment, useContext, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/brand.svg";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { NavLink, Route, useHistory } from "react-router-dom";
import cartContext from "../context/cart/cartContext";
import AuthContext from "../context/auth/AuthContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { LinkContainer } from "react-router-bootstrap";
import Search from "./Search";
import io from "socket.io-client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Appbar() {
  const CartContext = useContext(cartContext);

  const {
    logout,
    userData,
    loading,
    isAuthenticated,
    getUser,
    notifications,
    setNotification,
  } = useContext(AuthContext);
  const { cartItems } = CartContext;

  // useEffect(() => {
  //   getUser();
  //   //  eslint-disable-next-line
  // }, [location]);
  const handleLogout = () => {
    logout();
  };
  const history = useHistory();
  const socket = io(
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_URL
      : process.env.REACT_APP_DEV_URL
  );
  useEffect(() => {
    if (userData && userData._id) {
      console.log("fi");
      socket.emit("setup", userData);
      socket.on("notification", (notification) =>
        setNotification([...notifications, notification])
      );
    }
  }, []);
  useEffect(() => {
    if (!userData) history.push("/");
  }, [userData]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar
        bg="success"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="py-2"
        style={{
          boxShadow: "1px 1px 10px #a6a6a6",
          minHeight: "70px",
          position: "relative",
          zIndex: 4,
        }}
      >
        <>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img alt="" src={logo} width="32" height="32" /> Greengrocer
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Route render={({ history }) => <Search history={history} />} />
              {userData ? (
                userData.name ? (
                  <>
                    {" "}
                    <NavDropdown
                      title={
                        userData.name.length > 15
                          ? userData.name.split(" ")[0]
                          : userData.name
                      }
                      id="username"
                      className="mr-lg-3"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          <AccountCircleIcon style={{ color: "black" }} /> My
                          profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/wishlist">
                        <NavDropdown.Item>
                          <FavoriteIcon style={{ color: "black" }} /> Wishlist
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/myorders">
                        <NavDropdown.Item>
                          <CheckBoxOutlineBlankIcon
                            style={{ color: "black" }}
                          />
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/chat">
                        <NavDropdown.Item>
                          <NotificationsIcon style={{ color: "black" }} />
                          Chat
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={handleLogout}>
                        <ExitToAppIcon style={{ color: "black" }} /> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                    {userData.isAdmin && (
                      <LinkContainer to="/admin" className="mr-lg-3" id="admin">
                        <Nav.Link>Admin</Nav.Link>
                      </LinkContainer>
                    )}
                  </>
                ) : (
                  <></>
                )
              ) : (
                <LinkContainer to="/signin" className="mr-lg-3">
                  <Nav.Link>SignIn</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/chat" className="mr-lg-3">
                <Nav.Link>
                  <Badge badgeContent={notifications?.length} color="error">
                    <NotificationsNoneIcon />
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart" className="mr-lg-3">
                <Nav.Link>
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
    </>
  );
}

export default Appbar;

//  <LinkContainer to="/admin/userslist">
//                 <NavDropdown.Item>Users</NavDropdown.Item>
//               </LinkContainer>
//               <LinkContainer to="/admin/productslist">
//                 <NavDropdown.Item>Products</NavDropdown.Item>
//               </LinkContainer>
//               <LinkContainer to="/admin/orderslist">
//                 <NavDropdown.Item>Orders</NavDropdown.Item>
//               </LinkContainer>
