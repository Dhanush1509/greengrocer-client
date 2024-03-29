import React, { Fragment, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import ProductState from "./context/product/ProductState";
import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";
import Appbar from "./layout/Appbar";
import Home from "./routing/Home";
import Cart from "./routing/Cart";
import SingleProduct from "./routing/SingleProduct";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./layout/Alert";
import AlertState from "./context/alert/AlertState";
import CartState from "./context/cart/CartState";
import OrderState from "./context/order/OrderState";
import Profile from "./routing/UserProfile";
import NoMatch from "./components/NoMatch";
import AddressPage from "./routing/AddressPage";
import PaymentPage from "./routing/PaymentPage";
import PlaceOrder from "./routing/PlaceOrder";
import MyOrder from "./routing/MyOrders";
import OrderTrack from "./routing/OrderTrack";
import Order from "./routing/Order";
import Confirm from "./auth/Confirm";
import Confirmation from "./auth/Confirmation";
import Resend from "./auth/Resend";
import Admin from "./routing/Admin/Admin";
import Wishlist from "./routing/Wishlist";
import Footer from "./layout/Footer";
import ChatWindow from "./routing/ChatWindow";
import Header from "./layout/Header";
function App() {
  return (
    <div className="App">
      <AuthState>
        <AdminState>
          <CartState>
            <ProductState>
              <OrderState>
                <AlertState>
                  <Router>
                    <Fragment>
                    <Header/>
                      <Appbar />
                      <Alert />
                      <div
                        className="min-vh-100"
                        style={{ marginTop: "20px", padding: "0 5vw" }}
                      >
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route
                            path="/products/:id"
                            component={SingleProduct}
                          />
                          <Route exact path="/cart" component={Cart} />
                          <Route exact path="/signin" component={Login} />
                          <Route exact path="/signup" component={Register} />
                          <Route
                            exact
                            path="/query/:keyword/page/:pagenumber"
                            component={Home}
                          />
                          <Route
                            exact
                            path="/query/:keyword"
                            component={Home}
                          />
                          <Route
                            exact
                            path="/page/:pagenumber"
                            component={Home}
                          />
                          <Route
                            redirect="/profile"
                            exact
                            path="/profile"
                            component={Profile}
                          />
                          <Route exact path="/wishlist" component={Wishlist} />
                          <Route exact path="/chat" component={ChatWindow} />
                          <Route exact path="/myorders" component={MyOrder} />
                          <Route exact path="/order/:id" component={Order} />
                          <Route
                            exact
                            path="/order/:id/track"
                            component={OrderTrack}
                          />
                          <Route
                            exact
                            path="/confirmation/:email/:token"
                            component={Confirmation}
                          />
                          <Route
                            exact
                            path="/address"
                            component={AddressPage}
                          />
                          <Route
                            exact
                            path="/user/confirm"
                            component={Confirm}
                          />
                          <Route
                            exact
                            path="/email/resend"
                            component={Resend}
                          />
                          <Route
                            exact
                            path="/payment"
                            component={PaymentPage}
                          />
                          <Route
                            exact
                            path="/placeorder"
                            component={PlaceOrder}
                          />
                          <Route exact path="/admin" component={Admin} />
                       
                          <Route path="*" component={NoMatch} />
                        </Switch>
                      </div>

                      <Footer />
                    </Fragment>
                  </Router>
                </AlertState>
              </OrderState>
            </ProductState>
          </CartState>
        </AdminState>
      </AuthState>
    </div>
  );
}

export default App;
