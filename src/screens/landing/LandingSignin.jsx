import React from "react";
import "./landingpage.css";
import abc from '../../assets/images/doctor.svg'
import { useNavigate } from "react-router-dom";
const LandingSignin = () => {
  const navigate = useNavigate()
  return (
    <div className="landing__container">
      <div className="landing__header">
         <span>Telepathology</span>
      </div>
      <hr className="landing__hr" />
      <div className="signin__container">
        <div className="landing__img">

        <img src={abc} alt="bgimg" height="350px" width="100%" />
        </div>
       <div className="signin__patient">
           <h3 className="text-white font-weight-bold">For Patients</h3>
           <hr className="landing__hr" />
           <p>
            A patient is any recipient of health care services that are performed by healthcare professionals. 
            </p>
           <div className="landing__signin__container">
               <button className="landing__signin" onClick={() => navigate("/patient/login")}>
                   Login as patient
               </button>
           </div>
       </div>
       <div className="signin__pathologist">
         <h3 className="text-white font-weight-bold">For Pathologist</h3>
         <hr className="landing__hr" />
         <p>
            The role of pathology is to detect and determine the causes of infections and disease.
           </p>
         <div className="landing__signin__container">
               <button className="landing__signin" onClick={() => navigate("/pathologist/login")}>
                   Login as pathologist
               </button>
           </div>
       </div>
      </div>
    </div>
  );
};

export default LandingSignin;
