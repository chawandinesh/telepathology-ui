import React from "react";
import "./landingpage.css";
import wawe from '../assets/images/wave.png'
const LandingPage = () => {
  return (
    <div style={{ backgroundImage: `url(${wawe})`, backgroundSize: "100%", height: "100vh" }}>
      Hello World
    </div>
  );
};

export default LandingPage;
