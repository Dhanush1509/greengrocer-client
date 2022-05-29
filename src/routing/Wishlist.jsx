import React, { useContext, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/emptyCart.json";
import { Link } from "react-router-dom";
import SpinnerLocal from "../layout/Spinner";
import { Row, Col, ListGroup, Image, Container } from "react-bootstrap";
import productContext from "../context/product/productContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Cart() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { addWishList, getWishList, wishlist, wishLoading } =
    useContext(productContext);
  useEffect(() => {
    if (!wishlist || !wishlist.length > 0) getWishList();
  }, []);

  return wishLoading ? (
    <SpinnerLocal />
  ) : wishlist && wishlist.length > 0 ? (
    <div className="mt-4">
      <Row>
        <Col md={8}>
          <h2 style={{ textAlign: "left" }} className="m-3">
            WISH LIST
          </h2>
          <ListGroup style={{ textAlign: "center" }}>
            {wishlist.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={1}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      className={window.innerWidth > 720 ? "" : "mb-2 w-25"}
                      rounded
                    />
                  </Col>
                  <Col md={3} className="my-auto">
                    <Link to={`/products/${item.id}`}>
                      <h5>{item.name}</h5>
                    </Link>
                  </Col>
                  <Col md={3} className="my-auto">
                    <h6>₹{item.price}/kg</h6>
                  </Col>

                  <Col md={1} className="my-auto">
                    <IconButton onClick={() => addWishList(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  ) : (
    <Container className="pt-5" style={{ textAlign: "left" }}>
      <h4>
        Your Wishlist is empty &nbsp;
        <Link to="/">Go back</Link>
      </h4>

      <Lottie
        options={defaultOptions}
        style={{ width: "50%", height: "auto" }}
      />
    </Container>
  );
}

export default Cart;
