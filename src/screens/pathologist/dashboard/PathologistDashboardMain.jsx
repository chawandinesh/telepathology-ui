import React, { useState } from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";
import MyImg from "../../../assets/images/alex.jpeg";
import "./pathologistdashboardmain.css";
import ReactSelectComponent from "../../../components/ReactSelectComponent";

function PathologistDashboardMain() {
  const [selectedOption, setSelectedOption] = useState(undefined);
  console.log(selectedOption);
  const options = [
    { value: "doctor1", label: "Doctor1" },
    { value: "doctor2", label: "Doctor2" },
    { value: "doctor3", label: "Doctor3" },
  ];

  return (
    <div className="dashboard__main__container">
      <div className="dashboard__main__header">
        <h3>Dashboard</h3>
      </div>
      <div style={{ width: "100%", marginTop: "50px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "500px" }}>
          <ReactSelectComponent
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>
      {
        _.size(selectedOption) ?
      <div style={{ width: "100%", marginTop: "50px", display: "flex",flexDirection:'column',alignItems:'center', justifyContent: "center" }}>
          <div style={{width: "170px", height: "180px", borderRadius: "5px", border:"2px solid #66fcf1"}}>
          </div>
          <div style={{color:"#fff", width:"300px",marginLeft:"150px", textAlign:'left', marginTop:'20px'}}>
            <h4>{_.get(selectedOption,"label")}</h4>
            <span>doctor</span>
            <p>description</p>
          </div>
      </div>

        :
        null
      }
    </div>
  );
}

export default PathologistDashboardMain;
