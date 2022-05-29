import React, { Fragment, useContext, useEffect, useState } from "react";
import productContext from "../context/product/productContext";
import authContext from "../context/auth/AuthContext";
import { Spinner, Row } from "react-bootstrap";
import CardItem from "../components/CardItem";
import alertContext from "../context/alert/AlertContext";
import Paginate from "../layout/Paginate";
import Helmet from "../components/Title";
import HomeCarousel from "../components/HomeCarousel.jsx";

const ProductsList = () => {
  const ProductContext = useContext(productContext);
  const { products, wishlist} = ProductContext;

  return (
    <Row className="justify-content-md-left mt-5">
      {products.map((product) => (
        <CardItem
          key={product._id}
          _id={product._id}
          image={product.image}
          name={product.name}
          price={product.price}
          favouriteItem={
            wishlist &&
            wishlist.length > 0 &&
            wishlist.find((c) => c._id == product._id)
              ? true
              : false
          }
        />
      ))}
    </Row>
  );
};

const SpinnerLocal = () => {
  return (
    <Spinner
      role="status"
      animation="border"
      style={{
        color: "#56cc9d",
        height: "10vw",
        width: "10vw",
        marginTop: "30vh",
      }}
    />
  );
};

const Home = ({ history, match }) => {
  console.log("first");
  const { getUser } = useContext(authContext);
  // const [renderApp, setRenderApp] = useState(false);
  const ProductContext = useContext(productContext);
  const { getProducts, error, clearProductErrors, loading } = ProductContext;
  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;
  const keyword = match.params.keyword || "";
  const currentPageNumber = match.params.pagenumber || "";
  useEffect(() => {
    getProducts(keyword, currentPageNumber);
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, [history, keyword, currentPageNumber]);
  // console.log(match.params.keyword);
  useEffect(() => {
    if (error === "Products not found") {
      setAlert(error, "white", "red");
      clearProductErrors();
    }
    //eslint-disable-next-line
  }, [error]);
  // useEffect(() => {
  //   getUser();
  //   //eslint-disable-next-line
  // }, []);

  return (
    <>
      {keyword ? (
        <></>
      ) : (
        <>
          <Helmet />
          {/*<HomeText />*/}
          <HomeCarousel />
        </>
      )}
      <div style={{ paddingTop: keyword ? 0 : "25vw",minHeight:"150vh" }}>
        {loading ? (
          <SpinnerLocal />
        ) : (
          <>
            <ProductsList /> <Paginate keyword={keyword} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
