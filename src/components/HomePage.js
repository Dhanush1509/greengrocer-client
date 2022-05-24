import React from 'react'
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/shoppingLady.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const HomePage = () => {
    return (
      <>
        
        <center style={{margin:"auto"}}>
          <h1
            style={{
           
              fontWeight: "900",
              color: "#56cc9d",
              fontSize: "12vw",
              display: "inline-block",
              marginTop:window.innerWidth<600?("30vh"):("0vh")
            }}
          >
            Greengrocer
          </h1>
          <Lottie
            options={defaultOptions}
            style={{ width: "60%", height: "auto" }}
          />
        </center>
      </>
    );
}

export default HomePage
