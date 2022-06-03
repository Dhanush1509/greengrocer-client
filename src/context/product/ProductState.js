import React, { useReducer,useContext } from "react";
import axios from "axios";
import ProductContext from "./productContext";
import productReducer from "./productReducer";
import {
  GET_PRODUCTS,
  PRODUCTS_ERR,
  GET_PRODUCT,
  PRODUCT_ERR,
  CLEAR_PRODUCT_ERRORS,
  GET_PRODUCT_RESET,
  LOADING_PRODUCTS,
  GET_PRODUCTS_RESET,
  ADD_WISHLIST,
  GET_WISHLIST,
  WISHLIST_LOADING,
} from "../types.js";
import dotenv from "dotenv";
import AuthContext from "../auth/AuthContext";
import setAuth from "../../utils/setAuthToken";

dotenv.config();
const ProductState = (props) => {
        const { userData } = useContext(AuthContext);
  const initialState = {
    products: [],
    error: null,
    product: null,
    page: null,
    totalPages: null,
    loading: false,
    wishlist: [],
    wishLoading:true
  };
  const [state, dispatch] = useReducer(productReducer, initialState);
  const getProducts = async (keyword = "", number = "") => {

    console.log("called")
    try {
      dispatch({ type: LOADING_PRODUCTS });
      setAuth(userData?.token)
      if (!state.wishlist || !state.wishlist.length > 0) await getWishList();
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products?keyword=${keyword}&productpage=${number}`
      );
      dispatch({ type: GET_PRODUCTS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCTS_ERR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getProduct = async (id) => {
 
    try {
           setAuth(userData?.token);
      dispatch({ type: LOADING_PRODUCTS });
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/${id}`
      );
      dispatch({ type: GET_PRODUCT, payload: data });
      // dispatch({ type: GET_PRODUCT_RESET})
    } catch (err) {
      dispatch({
        type: PRODUCT_ERR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const addWishList = async (id) => {

    console.log(id);
    try {
           setAuth(userData?.token);
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/wishlist/${id}`
      );
      console.log(data);
      dispatch({ type: ADD_WISHLIST, payload: data });
      // dispatch({ type: GET_PRODUCT_RESET})
    } catch (err) {
      dispatch({
        type: PRODUCT_ERR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getWishList = async () => {
    try {     setAuth(userData?.token);
      dispatch({ type: WISHLIST_LOADING });
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }products/getwishlist`
      );
      dispatch({ type: GET_WISHLIST, payload: data });
      // dispatch({ type: GET_PRODUCT_RESET})
    } catch (err) {
      dispatch({
        type: PRODUCT_ERR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const clearProductErrors = () => {
    dispatch({ type: CLEAR_PRODUCT_ERRORS });
  };
  const getProductReset = () => {
    dispatch({ type: GET_PRODUCT_RESET });
  };
  const getProductsReset = () => {
    dispatch({ type: GET_PRODUCTS_RESET });
  };
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        error: state.error,
        product: state.product,
        getProducts,
        getProduct,
        clearProductErrors,
        getProductReset,
        getProductsReset,
        page: state.page,
        totalPages: state.totalPages,
        loading: state.loading,
        addWishList,
        getWishList,
        wishlist: state.wishlist,
        wishLoading:state.wishLoading
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
