import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";
import MyImg from "../../../assets/images/alex.jpeg";
import "./patientdashboardmain.css";
import ReactSelectComponent from "../../../components/ReactSelectComponent";
import PathologistCard from "../../../components/PathologistCard";
import { getAllPathologists } from "../../../helpers/helpers";

function PatientDashboardMain() {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [pathologistList, setPathologistList] = useState([])
  const options = _.map(pathologistList.filter(e => e.firstName || e.lastName),(each) => {return {value:each._id, label:`${each.firstName} ${each.lastName}`}})
  // const options = [
  //   { value: "doctor1", label: "Doctor1" },
  //   { value: "doctor2", label: "Doctor2" },
  //   { value: "doctor3", label: "Doctor3" },
  // ];

  const getListOfPathologists = () => {
    getAllPathologists().then(res => {
      return res.data
    }).then(result => {
      setPathologistList(result.data)
    })
  }

  useEffect(() => {
   getListOfPathologists()
  }, [])
  
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
      
        <div style={{width:"100%", display:"flex",marginTop:'100px', justifyContent:'center'}}>

        <div style={{display:"flex", flexDirection:"row", overflowX:"auto",flexWrap:'nowrap', whiteSpace:'nowrap',width:"800px"}}>
          {pathologistList.filter(e => e.firstName || e.lastName).map((each) =>  (
            <PathologistCard/>
          ))}
        </div>
        </div>
     
    </div>
  );
}

export default PatientDashboardMain;
