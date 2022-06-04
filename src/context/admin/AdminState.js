import React, { useReducer, useContext } from "react";
import AdminReducer from "./AdminReducer";
import AdminContext from "./AdminContext";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import setAuth from "../../utils/setAuthToken";

import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_USERS_COUNT,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ADMIN,
  UPDATE_USER_BY_ADMIN_ERROR,
  DELETE_USER_BY_ADMIN_ERROR,
  DELETE_USER_BY_ADMIN,
  CLEAR_ADMIN_MESSAGE,
  GET_ALL_ORDERS_FOR_ADMIN,
  GET_ALL_ORDERS_FOR_ADMIN_ERROR,
  UPDATE_ORDER_TO_DELIVERED,
  UPDATE_ORDER_TO_DELIVERED_ERROR,
  ORDER_LIST_LOADING,
  GET_ALL_PRODUCTS_FOR_ADMIN_ERROR,
  GET_ALL_PRODUCTS_FOR_ADMIN,
  DELETE_PRODUCT_BY_ADMIN_ERROR,
  DELETE_PRODUCT_BY_ADMIN,
  UPDATE_PRODUCT_BY_ADMIN_ERROR,
  UPDATE_PRODUCT_BY_ADMIN,
  ADD_PRODUCT_BY_ADMIN,
  ADD_PRODUCT_BY_ADMIN_ERROR,
  SET_ACTIVE_PAGE,
} from "../types";
import dotenv from "dotenv";
dotenv.config();
console.log(
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_URL
    : process.env.REACT_APP_DEV_URL
);
const AdminState = (props) => {
  const { userData } = useContext(AuthContext);
  const initialState = {
    adminProducts: null,
    users: null,
    adminError: null,
    adminMessage: null,
    usersCount: null,
    userDetailsForAdmin: null,
    orderDetailsOfUserForAdmin: null,
    adminOrders: [],
    ordersCount: null,
    pendingDeliveredItemsCount: null,
    deliveredItemsCount: null,
    paymentsCount: null,
    adminOrder: null,
    orderListLoading: false,
    productsForAdmin: [],
    success: false,
    activePage: "Dashboard",
  };
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const getAllProductsForAdmin = async () => {
    try {
      dispatch({ type: ORDER_LIST_LOADING });
      setAuth(userData?.token);
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/admin`
      );
      dispatch({ type: GET_ALL_PRODUCTS_FOR_ADMIN, payload: data });
    } catch (err) {
      dispatch({
        type: GET_ALL_PRODUCTS_FOR_ADMIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  const getAllUsers = async () => {
    dispatch({ type: ORDER_LIST_LOADING });
    setAuth(userData?.token);
    try {
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/`
      );
      dispatch({ type: GET_ALL_USERS, payload: data.users });
      dispatch({ type: GET_USERS_COUNT, payload: data.users });
    } catch (err) {
      dispatch({
        type: GET_ALL_USERS_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getUserById = async (userId) => {
    dispatch({ type: ORDER_LIST_LOADING });
    setAuth(userData?.token);
    try {
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/${userId}`
      );
      dispatch({ type: GET_USER_BY_ID, payload: data });
    } catch (err) {
      dispatch({
        type: GET_USER_BY_ID,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const deleteUserByAdmin = async (userId) => {
    setAuth(userData?.token);
    try {
      const { data } = await axios.delete(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/${userId}`
      );
      dispatch({ type: DELETE_USER_BY_ADMIN, payload: data });
      document.location.href("/admin");
    } catch (err) {
      dispatch({
        type: DELETE_USER_BY_ADMIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const updateUserByAdmin = async (userId, formData) => {
    const { name, email, isAdmin, isVerified } = formData;

    setAuth(userData?.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/${userId}`,
        formData,
        config
      );
      dispatch({ type: UPDATE_USER_BY_ADMIN, payload: data });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_BY_ADMIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const clearAdminMessage = () => {
    dispatch({ type: CLEAR_ADMIN_MESSAGE });
  };
  const getAllOrdersForAdmin = async () => {
    dispatch({ type: ORDER_LIST_LOADING });
    setAuth(userData?.token);
    try {
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }orders`
      );
      dispatch({ type: GET_ALL_ORDERS_FOR_ADMIN, payload: data.orders });
    } catch (err) {
      dispatch({
        type: GET_ALL_ORDERS_FOR_ADMIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const updateOrderToDelivered = async (Id) => {
    dispatch({ type: ORDER_LIST_LOADING });
    setAuth(userData?.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }orders/${Id}`,
        {},
        config
      );
      dispatch({
        type: UPDATE_ORDER_TO_DELIVERED,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_TO_DELIVERED_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const deleteProductByAdmin = async (id) => {
    setAuth(userData?.token);
    dispatch({ type: ORDER_LIST_LOADING });
    try {
      const { data } = await axios.delete(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/admin/${id}`
      );
      dispatch({ type: DELETE_PRODUCT_BY_ADMIN, payload: data });
    } catch (err) {
      dispatch({
        type: DELETE_PRODUCT_BY_ADMIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const createProductByAdmin = async (formData) => {
    setAuth(userData?.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: ORDER_LIST_LOADING });
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/admin/addproduct`,
        formData,
        config
      );

      dispatch({ type: ADD_PRODUCT_BY_ADMIN, payload: data });
    } catch (err) {
      dispatch({ type: ADD_PRODUCT_BY_ADMIN_ERROR });
    }
  };
  const updateProductByAdmin = async (formData, id) => {
    setAuth(userData?.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: ORDER_LIST_LOADING });
      const { data } = await axios.put(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/admin/${id}`,
        formData,
        config
      );
      console.log(data);
      dispatch({ type: UPDATE_PRODUCT_BY_ADMIN, payload: data });
    } catch (err) {
      dispatch({ type: UPDATE_PRODUCT_BY_ADMIN_ERROR });
    }
  };
  const setActivePage = (name) => {
    dispatch({ type: SET_ACTIVE_PAGE, payload: name });
  };
  return (
    <AdminContext.Provider
      value={{
        getUserById,
        getAllUsers,
        adminProducts: state.adminProducts,
        users: state.users,
        adminError: state.adminError,
        usersCount: state.usersCount,
        userDetailsForAdmin: state.userDetailsForAdmin,
        adminMessage: state.adminMessage,
        orderDetailsOfUserForAdmin: state.orderDetailsOfUserForAdmin,
        updateUserByAdmin,
        deleteUserByAdmin,
        clearAdminMessage,
        getAllOrdersForAdmin,
        updateOrderToDelivered,
        activePage: state.activePage,
        setActivePage,
        adminOrders: state.adminOrders,
        ordersCount: state.ordersCount,
        pendingDeliveredItemsCount: state.pendingDeliveredItemsCount,
        deliveredItemsCount: state.deliveredItemsCount,
        paymentsCount: state.paymentsCount,
        orderListLoading: state.orderListLoading,
        adminOrder: state.adminOrder,
        getAllProductsForAdmin,
        productsForAdmin: state.productsForAdmin,
        deleteProductByAdmin,
        success: state.success,
        updateProductByAdmin,
        createProductByAdmin,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminState;
