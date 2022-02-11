import React from "react";
// import MyImg from "../assets/images/alex.jpeg";
import { baseUrl } from "../helpers/helpers";
import pathologistImg from '../assets/images/pathologist.png'
const PathologistCard = ({name,designation,experience,image}) => {
  const imageurl = image ? `${baseUrl}/${image}` : pathologistImg
  const userName = name === "undefined undefined"  ? "Test Pathologist" : name
  return (
      <div style={{ height: "auto", width: "300px", borderRadius: "5px",margin:"10px 30px", boxShadow: "0px 2px 7px 0px #fff" }}>
        <div style={{ height: "180px"}}>
          <img src={imageurl} height="100%" width="100%" alt="pathologist" />
        </div>
        <div
          style={{
            backgroundColor: "#1F2833",
            textAlign: "center",
            color: "white",
            border: "1px solid #888",
            borderTop: "none",
          }}
        >
          <h3>{userName}</h3>
          <div>
            <span>{designation}</span>
          </div>
          <div>
            <span>{experience}</span>
          </div>
        </div>
      </div>
  );
};

export default PathologistCard;
