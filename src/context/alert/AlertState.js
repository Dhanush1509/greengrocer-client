import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, CLEAR_ALERT } from "../types";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AlertState(props) {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, color, bgColor, timeOut = 6000) => {
    // const id = uuidv4();
    // dispatch({ type: SET_ALERT, payload: { id, msg, color, bgColor } });
    // setTimeout(() => {
    //   dispatch({ type: CLEAR_ALERT, payload: id });
    // }, timeOut);
    bgColor == "#dc3545"
      ? toast.warn(msg, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      : toast.success(msg, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
