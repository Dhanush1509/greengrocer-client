import axios from "axios";
import dotenv from "dotenv";
dotenv.config()
const setAuthToken = (token) => {
  console.log(process.env)
  axios.defaults.headers.common["apiKey"]=process.env.REACT_APP_API_KEY;
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
export default setAuthToken;
