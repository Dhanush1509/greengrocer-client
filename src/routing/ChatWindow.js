import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import SpinnerLocal from "../layout/Spinner";
import { Row, Col, ListGroup, Image, Container, Form } from "react-bootstrap";
import productContext from "../context/product/productContext";
import authContext from "../context/auth/AuthContext";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { ChangeHistorySharp } from "@material-ui/icons";
import ScrollableFeed from "react-scrollable-feed";
import * as animationData from "../assets/reactLottie/typing.json";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatLogics";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import io from "socket.io-client";
import dotenv from "dotenv";
dotenv.config()
const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL
    : process.env.REACT_APP_DEV_URL; 
var socket, selectedChatCompare;
const chat = [{ name: "hiwsgteshrfdghdfrhg" }],
  chatLoading = false;

const ChatWindow = ({ history }) => {
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchChats = async (token) => {
    // console.log(user._id);
    setAuthToken(token);

    try {
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }chats`
      );
      setChats(data);
    } catch (err) {
      //    err.response && err.response.data.message
      //      ? err.response.data.message
      //      : err.message,
    }
  };
  const accessChats = async (token, id) => {
    // console.log(user._id);
    setAuthToken(token);

    try {
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }chats/${id}`
      );
      setChatData(data);
    } catch (err) {
      //    err.response && err.response.data.message
      //      ? err.response.data.message
      //      : err.message,
    }
  };
  const sendMessage = async (event, token) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      setAuthToken(token);
      try {
        setNewMessage("");

        const { data } = await axios.post(
          `${
            process.env.NODE_ENV == "production"
              ? process.env.REACT_APP_URL
              : process.env.REACT_APP_DEV_URL
          }messages/`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          }
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (err) {
        //    err.response && err.response.data.message
        //      ? err.response.data.message
        //      : err.message,
      }
    }
  };
  const fetchMessages = async (token) => {
    if (!selectedChat) return;
    setAuthToken(token);
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URL
            : process.env.REACT_APP_DEV_URL
        }messages/${selectedChat._id}`
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      //    err.response && err.response.data.message
      //      ? err.response.data.message
      //      : err.message,
    }
  };

  const { userData, setNotification, notifications } = useContext(authContext);
  useEffect(() => {
    if (userData && userData.token) fetchChats(userData.token);
  }, [userData]);
  // useEffect(() => {
  //   if (userData && userData.token)
  //     if (selectedChat && selectedChat._id)
  //       accessChats(userData.token, selectedChat._id);
  // }, [selectedChat, userData]);

  /////////////////////////////////////

  useEffect(() => {
    socket = io(ENDPOINT);
    if (userData) {
      socket.emit("setup", userData);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userData && userData.token) fetchMessages(userData.token);
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(
        "notified",
        newMessageRecieved,
        selectedChatCompare,
        notifications,
        chatData
      );
      setChatData("hi");
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notifications.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notifications]);
          if (userData && userData.token) fetchChats(userData.token);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      console.log("typij");
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return chatLoading ? (
    <SpinnerLocal />
  ) : chats && chats.length > 0 ? (
    <div className="mt-4">
      <h2 style={{ textAlign: "left" }} className="my-3">
        CHAT
      </h2>
      <Row>
        <Col md={3}>
          <ListGroup style={{ textAlign: "center" }}>
            {chats.map((item) => (
              <ListGroup.Item
                key={item._id}
                onClick={() => setSelectedChat(item)}
              >
                <p style={{ margin: 0 }}>{item.chatName}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col
          className="chatInputContainer"
          md={9}
          style={{ boxShadow: "-1px 1px 3px #a6a6a6" }}
        >
          {selectedChat ? (
            <>
              {messages && messages.length > 0 ? (
                <ScrollableFeed>
                  {messages &&
                    messages.map((m, i) => (
                      <div
                        style={{ display: "flex", paddingBottom: "20px" }}
                        key={m._id}
                      >
                        {(isSameSender(messages, m, i, userData._id) ||
                          isLastMessage(messages, i, userData._id)) && (
                          // <Tooltip
                          //   label={m.sender.name}
                          //   placement="bottom-start"
                          //   hasArrow
                          // >
                          //   <Avatar
                          //     mt="7px"
                          //     mr={1}
                          //     size="sm"
                          //     cursor="pointer"
                          //     name={m.sender.name}
                          //     src={m.sender.pic}
                          //   />
                          // </Tooltip>
                          <></>
                        )}
                        <span
                          style={{
                            backgroundColor: `${
                              m.sender._id === userData._id
                                ? "#BEE3F8"
                                : "#B9F5D0"
                            }`,
                            marginLeft: isSameSenderMargin(
                              messages,
                              m,
                              i,
                              userData._id
                            ),
                            marginTop: isSameUser(messages, m, i, userData._id)
                              ? 3
                              : 10,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                          }}
                        >
                          {m.content}
                        </span>
                      </div>
                    ))}
                </ScrollableFeed>
              ) : (
                <></>
              )}{" "}
              <Form.Group
                controlId="formBasicPassword"
                className="mb-0 px-1 chatInput"
              >
                {istyping ? <p>typing...</p> : <></>}
                <Form.Control
                  onKeyDown={(e) => {
                    if (userData && userData.token)
                      sendMessage(e, userData.token);
                  }}
                  type="text"
                  placeholder=" Press enter to send"
                  value={newMessage}
                  onChange={typingHandler}
                />
              </Form.Group>
            </>
          ) : (
            <div
              style={{ marginTop: "20vh", cursor: "pointer" }}
              onClick={() =>
                userData &&
                userData.token &&
                chats &&
                chats.length > 0 &&
                setSelectedChat(chats[0])
              }
            >
              <AddCircleOutlineIcon fontSize="large" />
              <h1 style={{ marginTop: "5vh", fontSize: "5vw" }}>
                Start Chatting
              </h1>
            </div>
          )}
       
        </Col>
      </Row>
    </div>
  ) : (
    <></>
  );
};

export default ChatWindow;
