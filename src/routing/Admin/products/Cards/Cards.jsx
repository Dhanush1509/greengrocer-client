import React, { useState, useContext, useEffect } from "react";
import "./Cards.css";
import "./Card.css";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion/dist/framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import { Button, Form } from "react-bootstrap";
import AdminContext from "../../../context/admin/AdminContext";
import alertContext from "../../../context/alert/AlertContext";
import ProductContext from "../../../context/product/productContext";
import AuthContext from "../../../context/auth/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  td: {
    width: "fitContent",
  },
});

const Cards = (props) => {
  const {
    getUserById,
    adminMessage,
    adminError,
    error,
    userDetailsForAdmin,

    clearAdminMessage,
  } = useContext(AdminContext);
  const { getProduct } = useContext(ProductContext);
  const { setAlert } = useContext(alertContext);
  const history = useHistory();
  useEffect(() => {
    console.log(adminMessage);
    if (adminMessage) {
      if (!userDetailsForAdmin) {
        clearAdminMessage();
        history.push("/admin");
      }
      if (adminMessage.message === "Updated Successfully") {
        setAlert(adminMessage.message, "white", "#56cc9d");
      } else if (adminMessage.message === "Deletion Successful") {
        setAlert(adminMessage.message, "white", "#56cc9d");
      }
    }
    if (error) {
      if (adminError.error === "Update failed!!") {
        setAlert(adminError.error, "white", "#dc3545");
      } else if (adminError.error === "User deletion unsuccessful") {
        setAlert(adminError.error, "white", "#dc3545");
      }
    }

    //eslint-disable-next-line
  }, [adminMessage]);
  useEffect(
    () => {
      console.log(props.id);
      if (props.id !== "") getProduct(props.id);
    },
    //eslint-disable-next-line
    [props.id]
  );

  return (
    <>
      <div className="Cards">
        <div className="parentContainer">
          <CardGet
            value="Get Details"
            color={{
              backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255, 202, 113) -46.42%)",
              boxShadow: "rgb(249 213 155) 0px 10px 20px 0px",
            }}
          />
        </div>
        {props.id && (
          <>
            <div className="parentContainer">
              <CardUpdate
                id={props.id}
                value="Update"
                color={{
                  backGround:
                    "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                  boxShadow: "0px 10px 20px 0px #e0c6f5",
                }}
              />
            </div>
            <div className="parentContainer">
              <CardDelete
                id={props.id}
                value="Delete"
                color={{
                  backGround:
                    "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                  boxShadow: "0px 10px 20px 0px #FDC0C7",
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const CardGet = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCardGet param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCardGet param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCardGet({ param, setExpanded }) {
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="detail">
        <span>{param.value}</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCardGet({ param, setExpanded }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const { getProduct, product, getProductReset, loading } =
    useContext(ProductContext);
  const { userData } = useContext(AuthContext);
  const {
    updateProductByAdmin,
    orderListLoading,
    success,
    adminMessage,
    clearAdminMessage,
    createProductByAdmin,
  } = useContext(AdminContext);
  const { setAlert } = useContext(alertContext);
  useEffect(() => {
    if (userData) {
      if (userData.isAdmin === false) {
        history.push("/");
      }
    }
    if (!userData) {
      history.push("/");
    }

    if (adminMessage) {
      setAlert("Product added Successfully", "white", "#56cc9d");
      clearAdminMessage();
    }
    //eslint-disable-next-line
  }, [product, success, adminMessage]);

  const submitHandler = (e) => {
    e.preventDefault();
    createProductByAdmin({
      name,
      price,
      image,
      category,
      countInStock,
      description,
      keywords,
    });
    setExpanded(false)
    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setCountInStock("");
    setDescription("");
    setKeywords("");
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <div className="chartContainer">
        {" "}
        <div
          className="form-container"
          style={{ marginTop: "5px", paddingTop: 0 }}
        >
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Control
                type="text"
                placeholder="count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="keywords">
              <Form.Control
                type="text"
                placeholder="Keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}

const CardDelete = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCardDelete
          param={props}
          setExpanded={() => setExpanded(false)}
        />
      ) : (
        <CompactCardDelete
          param={props}
          setExpanded={() => setExpanded(true)}
        />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCardDelete({ param, setExpanded }) {
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="detail">
        <span>{param.value}</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCardDelete({ param, setExpanded }) {
  const { deleteProductByAdmin } = useContext(AdminContext);
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>{" "}
      <div className="chartContainer">
        <div class="form-container">
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => {
               deleteProductByAdmin(param.id);
               setExpanded(false)
            }}
          >
            Delete Product
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
const CardUpdate = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCardUpdate
          param={props}
          setExpanded={() => setExpanded(false)}
        />
      ) : (
        <CompactCardUpdate
          param={props}
          setExpanded={() => setExpanded(true)}
        />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCardUpdate({ param, setExpanded }) {
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="detail">
        <span>{param.value}</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCardUpdate({ param, setExpanded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const { getProduct, product, getProductReset, loading } =
    useContext(ProductContext);
  const { userData } = useContext(AuthContext);
  const {
    updateProductByAdmin,

    success,
    adminMessage,
    clearAdminMessage,
  } = useContext(AdminContext);
  const { setAlert } = useContext(alertContext);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setKeywords(product.keywords);
    }
    if (adminMessage) {
      getProduct(param.id);
      setAlert("Product updated Successfully", "white", "#56cc9d");
      clearAdminMessage();
    }
    //eslint-disable-next-line
  }, [param.id, product, success, adminMessage]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateProductByAdmin(
      { name, price, image, category, countInStock, description, keywords },
      param.id
    );
    setExpanded(false);
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <div className="chartContainer">
        <div className="form-container">
   
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Control
                type="text"
                placeholder="count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="keywords">
              <Form.Control
                type="text"
                placeholder="Keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
export default Cards;
