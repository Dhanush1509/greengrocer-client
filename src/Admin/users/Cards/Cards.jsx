import React, { useState, useContext, useEffect } from "react";
import "./Cards.css";
import "./Card.css";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion/dist/framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import { Button, Form } from "react-bootstrap";
import AdminContext from "../../../context/admin/AdminContext";
import alertContext from "../../../context/alert/AlertContext";
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
      if (props.id !== "") getUserById(props.id);
    },
    //eslint-disable-next-line
    [props.id]
  );

  return (
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
      <div className="parentContainer">
        <CardUpdate
          id={props.id}
          value="Update"
          color={{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          }}
        />
      </div>
      <div className="parentContainer">
        <CardDelete
          id={props.id}
          value="Delete"
          color={{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          }}
        />
      </div>
    </div>
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
  const classes = useStyles();
  const {
    getUserById,
    usersCount,
    adminMessage,
    adminError,
    error,
    userDetailsForAdmin,
    orderDetailsOfUserForAdmin,
    updateUserByAdmin,
    deleteUserByAdmin,
    clearAdminMessage,
  } = useContext(AdminContext);
  console.log(orderDetailsOfUserForAdmin);
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
      {userDetailsForAdmin && (
        <div className="chartContainer">
          <TableContainer
            component={Paper}
            style={{ color: "#fff", background: "transparent" }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">isVerified</TableCell>
                  <TableCell align="right">isAdmin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {userDetailsForAdmin.name}
                  </TableCell>
                  <TableCell align="right">
                    {userDetailsForAdmin.email}
                  </TableCell>
                  <TableCell align="right">
                    {userDetailsForAdmin.isVerified ? "true" : "false"}
                  </TableCell>
                  <TableCell align="right">
                    {userDetailsForAdmin.isAdmin ? "true" : "false"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer
            component={Paper}
            style={{
              color: "#fff",
              background: "transparent",
              overflowY: "auto",
              height: "50%",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">order Id</TableCell>
                  <TableCell align="right">order createdAt</TableCell>
                  <TableCell align="right">paymentOption</TableCell>
                  <TableCell align="right">deliveryPrice</TableCell>
                  <TableCell align="right">taxPrice</TableCell>
                  <TableCell align="right">itemsPrice</TableCell>
                  <TableCell align="right">totalPrice</TableCell>
                  <TableCell align="right">isPaid</TableCell>
                  <TableCell align="right">order</TableCell>
                  <TableCell align="right">order UpdatedAt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetailsOfUserForAdmin ? (
                  [
                    ...orderDetailsOfUserForAdmin,
                    ...orderDetailsOfUserForAdmin,

                    ...orderDetailsOfUserForAdmin,

                    ...orderDetailsOfUserForAdmin,
                  ].map((order) => (
                    <TableRow>
                      <TableCell align="right">{order._id}</TableCell>
                      <TableCell align="right">{order.createdAt}</TableCell>
                      <TableCell align="right">{order.paymentOption}</TableCell>
                      <TableCell align="right">{order.deliveryPrice}</TableCell>
                      <TableCell align="right">{order.taxPrice}</TableCell>
                      <TableCell align="right">{order.itemsPrice}</TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>
                      <TableCell align="right">
                        {order.isPaid ? "true" : "false"}
                      </TableCell>

                      <TableCell align="right">
                        {order.isDelivered ? "true" : "false"}
                      </TableCell>
                      <TableCell align="right">{order.updatedAt}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
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
  const { deleteUserByAdmin } = useContext(AdminContext);
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
              deleteUserByAdmin(param.id);
                  setExpanded(false);
            }}
          >
            Delete User
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
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { updateUserByAdmin, userDetailsForAdmin } = useContext(AdminContext);
  const onSubmit = (e) => {
    e.preventDefault();

    updateUserByAdmin(param.id, {
      name,
      email,
      isAdmin,
      isVerified,
    });
    setExpanded(false);
  };

  useEffect(() => {
    if (userDetailsForAdmin) {
      setName(userDetailsForAdmin.name);
      setEmail(userDetailsForAdmin.email);
      setIsVerified(userDetailsForAdmin.isVerified);
      setIsAdmin(userDetailsForAdmin.isAdmin);
    }

    //eslint-disable-next-line
  }, [userDetailsForAdmin]);
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
        <div
          class="form-container"
          style={{
            textAlign: "left",
            margin: "none",
          }}
        >
          <h2 style={{ color: "#fff" }}>Update profile</h2>

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formGroupText">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                maxLength="30"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Check
              style={{ color: "#fff" }}
              className="mb-2"
              id="default-checkbox1"
              label="isAdmin"
              checked={isAdmin}
              onChange={(e) => {
                setIsAdmin(e.target.checked);
              }}
            ></Form.Check>
            <Form.Check
              style={{ color: "#fff" }}
              className="mb-2"
              id="default-checkbox2"
              label="isVerified"
              checked={isVerified}
              onChange={(e) => {
                setIsVerified(e.target.checked);
              }}
            ></Form.Check>
            <Button variant="primary" type="submit">
              Edit Profile
            </Button>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
export default Cards;
