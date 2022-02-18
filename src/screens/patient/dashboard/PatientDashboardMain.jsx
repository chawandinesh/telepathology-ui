import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";
import MyImg from "../../../assets/images/alex.jpeg";
import "./patientdashboardmain.css";
import ReactSelectComponent from "../../../components/ReactSelectComponent";
import PathologistCard from "../../../components/PathologistCard";
import { getAllPathologists } from "../../../helpers/helpers";

function PatientDashboardMain() {
  const [value, setValue] = useState("")
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [pathologistList, setPathologistList] = useState([])
  const options = _.map(pathologistList.filter(e => e.firstName || e.lastName),(each) => {return {value:each._id, label:`${each.firstName} ${each.lastName}`}})
  // const options = [
  //   { value: "doctor1", label: "Doctor1" },
  //   { value: "doctor2", label: "Doctor2" },
  //   { value: "doctor3", label: "Doctor3" },
  // ];
 console.log(pathologistList)
  const handleGetValue = (value) => {
    console.log(value,'value')
    setValue(value)
  }

   console.log(value,'value')
  const getListOfPathologists = () => {
    getAllPathologists().then(res => {
      return res.data
    }).then(result => {
      // setPathologistList(result.data)
      setPathologistList(result.data.filter(e => e.firstName || e.lastName))
    })
  }
  console.log(pathologistList)
  useEffect(() => {
   getListOfPathologists()
  }, [])
  
  return (
    <div className="dashboard__main__container">
      <div className="dashboard__main__header">
        <h3>Dashboard</h3>
      </div>
      {/* <div style={{ width: "100%", marginTop: "50px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "500px" }}>
          <ReactSelectComponent
             getVal={handleGetValue}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div> */}
      
        <div style={{width:"100%", display:"flex",marginTop:'100px', justifyContent:'center'}}>

        <div style={{display:"flex", flexDirection:"row", overflowX:"auto",flexWrap:'nowrap', whiteSpace:'nowrap',width:"800px"}}>
          {pathologistList.filter(e => e.firstName.includes(value) ||  e.lastName.includes(value)).map((each) =>  {
            console.log(each)
            return(
            <PathologistCard name={`${each.firstName} ${each.lastName}`} designation={each.designation} experience={each.experience} image={each.image}/>
          )})}
        </div>
        </div>
     
    </div>
  );
}

export default PatientDashboardMain;
