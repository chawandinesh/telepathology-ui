import React from "react";
import MyImg from "../assets/images/alex.jpeg";
const PathologistCard = () => {
  return (
      <div style={{ height: "auto", width: "300px", borderRadius: "5px",margin:"10px 30px", boxShadow: "0px 2px 7px 0px #fff" }}>
        <div style={{ height: "180px", backgroundColor: "#766" }}>
          <img src={MyImg} height="100%" width="100%" alt="pathologist" />
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
          <h3>Alex scholder</h3>
          <div>
            <span>professional gynochologist</span>
          </div>
          <div>
            <span>2 years experience</span>
          </div>
        </div>
      </div>
  );
};

export default PathologistCard;
