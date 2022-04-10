import React from "react";
import "./landingpage.css";
import abc from "../../assets/images/medical.svg";
import { useNavigate } from "react-router-dom";
const LandingSignup = () => {
    const navigate = useNavigate()
  return (
    <div className="landing__container">
      <div className="landing__header b">
        <span>AI Based Telepathology</span>
      </div>
      <hr className="landing__hr bgb" />
      <div className="signin__container">
        <div className="signin__patient">
          <h3 className="font-weight-bold b">For Patients</h3>
          <hr className="landing__hr bgb" />
          <p className="b">A patient is any recipient of health care services that are performed by healthcare professionals.</p>
          <div className="landing__signin__container">
            <button className="landing__signin bgb text-white" onClick={() => navigate("/patient/registration ")}>Patient Registration</button>
          </div>
        </div>
        <div className="signin__pathologist">
          <h3 className="font-weight-bold b">For Pathologist</h3>
          <hr className="landing__hr bgb" />
          <p className="b">The role of pathology is to detect and determine the causes of infections and disease.</p>
          <div className="landing__signin__container">
            <button className="landing__signin bgb text-white" onClick={() => navigate("/pathologist/registration")}>Pathologist Registration</button>
          </div>
        </div>
        <div className="landing__img">
          <img src={abc} alt="bgimg" height="350px" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default LandingSignup;
