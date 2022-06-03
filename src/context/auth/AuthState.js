import React, { useReducer, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuth from "../../utils/setAuthToken";
import {
  LOGIN_ERROR,
  LOGIN_USER,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_ERROR,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
  GET_USER_ERROR,
  REMOVE_USER_DATA,
  RESEND_LINK,
  RESEND_LINK_ERROR,
  CLEAR_MESSAGE,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_ERROR,
  SET_NOTIFICATION,
} from "../types.js";
import dotenv from "dotenv";
dotenv.config();
const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
function AuthState(props) {
  const initialState = {
    loading: true,
    isAuthenticated: false,
    error: null,
    message: null,
    userData: userInfoStorage,
    userDetails: {},
    notifications: [],
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const setNotification = (p) => {
    dispatch({ type: SET_NOTIFICATION, payload: p });
  };
  const loginUser = async (formData) => {
    console.log(formData);
      setAuth(state.userData?.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/login`,
        formData,
        config
      );
      await dispatch({ type: LOGIN_USER, payload: data });
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const confirmation = async (email, token) => {
    try {
            setAuth(state.userData?.token);
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/confirmation/${email}/${token}`
      );
      dispatch({ type: CONFIRM_EMAIL, payload: data });
    } catch (err) {
      dispatch({
        type: CONFIRM_EMAIL_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const resendLink = async (email) => {
          setAuth(state.userData?.token);
    console.log(email);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }resendlink`,
        email,
        config
      );

      dispatch({ type: RESEND_LINK, payload: data });
    } catch (err) {
      dispatch({
        type: RESEND_LINK_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const registerUser = async (formData) => {
    console.log(formData);      setAuth(state.userData?.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/register`,
        formData,
        config
      );

      dispatch({ type: REGISTER_USER, payload: data });
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getUser = async () => {

      setAuth(state.userData?.token);
    
    try {
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }users/profile`
      );
      console.log(data);
      dispatch({ type: GET_USER, payload: data });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      dispatch({
        type: GET_USER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const updateUser = async (formData) => {

      setAuth(state.userData?.token);

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
        }users/profile`,
        formData,
        config
      );
      dispatch({ type: UPDATE_USER, payload: data });
      getUser();
    } catch (err) {
      dispatch({
        type: GET_USER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT_USER });
    document.location.href = "/signin";
  };
  useEffect(
    () => {
      localStorage.setItem("userInfo", JSON.stringify(state.userData));
    },
    //eslint-disable-next-line
    [state.userData]
  );
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERROR });
  };
  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGE });
  };
  const removeUserData = () => {
    dispatch({ type: REMOVE_USER_DATA });
  };
  return (
    <AuthContext.Provider
      value={{
        userDetails: state.userDetails,
        updateUser,
        logout,
        clearErrors,
        loginUser,
        registerUser,
        getUser,
        removeUserData,
        resendLink,
        clearMessages,
        confirmation,
        message: state.message,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
        loading: state.loading,
        setNotification,
        notifications: state.notifications,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
