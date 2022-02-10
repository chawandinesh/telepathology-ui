import React from "react";
import "./landingpage.css";
import abc from '../../assets/images/undraw_medicine_b-1-ol.svg'
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="landing__container">
      <div className="landing__header">
         <span>AI Based Telepathology</span>
      </div>
      <hr className="landing__hr" />
      <div className="landing__btn__container">
        <button className="login__btn" onClick={() => navigate("/landing/signin")}>Login</button>
        <button className="signup__btn"  onClick={() => navigate("/landing/signup")}>Signup</button>
      </div>
      <div className="landing__dashboard__main">
        <div className="landing__img">

        <img src={abc} alt="bgimg" height="350px" width="100%" />
        </div>
        <div className="landing__info">

          <div className="landing__for__patient">
            <span>Patient</span>
            <p>
            A patient is any recipient of health care services that are performed by healthcare professionals. The patient is most often ill or injured and in need of treatment by a physician, nurse, psychologist, dentist, veterinarian, or other health care provider.
            </p>
          </div>
          <div className="landing__for__pathologist">
          <span>Pathologist</span>
            <p>
            A pathologist is a physician who studies body fluids and tissues, helps your primary care doctor make a diagnosis about your health or any medical problems you have, and uses laboratory tests to monitor the health of patients with chronic conditions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
