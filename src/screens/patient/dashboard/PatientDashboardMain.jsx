import React, { useEffect, useState } from "react";
import _ from "lodash";
import MyImg from "../../../assets/images/alex.jpeg";
import "./patientdashboardmain.css";
import { baseUrl, getAllPathologists, getPatientServiceById, getUserData } from "../../../helpers/helpers";
import OneA from "./components/OneA";
import { BsEye } from "react-icons/bs";
import ModalComponent from "../../../components/ModalComponent";



function PatientDashboardMain() {
  const [value, setValue] = useState("");
  const [modalData, setModalData] = useState({show: false, info: {}})
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [hoveredData, setHoveredData] = useState(null)
  const [allServices, setAllServices] = useState([])
  const [pathologistList, setPathologistList] = useState([]);
  const options = _.map(
    pathologistList.filter((e) => e.firstName || e.lastName),
    (each) => {
      return { value: each._id, label: `${each.firstName} ${each.lastName}` };
    }
  );
  // const options = [
  //   { value: "doctor1", label: "Doctor1" },
  //   { value: "doctor2", label: "Doctor2" },
  //   { value: "doctor3", label: "Doctor3" },
  // ];
  console.log(pathologistList);
  const handleGetValue = (value) => {
    console.log(value, "value");
    setValue(value);
  };

  console.log(value, "value");
  const getListOfPathologists = () => {
    getAllPathologists()
      .then((res) => {
        return res.data;
      })
      .then((result) => {
        // setPathologistList(result.data)
        setPathologistList(result.data);
      });
  };

  const PathologistItem = ({pathologist}) => {
    console.log(pathologist,'path')

    return (
      <div style={{ padding: "10px",marginTop: "20px", display: "flex", justifyContent: "center", position: "relative" }}>
        <div
          onMouseOverCapture={() => setHoveredData(pathologist._id)}
          onMouseOutCapture={() => setHoveredData(null)}
        
          style={{
            height: "120px",
            cursor:'pointer',
            width: "60%",
            borderRadius: "20px",
            backgroundColor: "#1F2833",
            boxShadow: "rgb(255 255 255) 0px 0px 5px -1px",
            display: "flex",
          }}
        >
          <div
            style={{
              padding: "5px",
              width: "35%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`${baseUrl}/${pathologist.image}`}
              height="100px"
              width="100px"
              alt="no image"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
          <div style={{ width: "65%", padding: "5px", color: "#fff" }}>
            <h3>{_.get(pathologist,'firstName','FName')} {_.get(pathologist,'lastName',"LName")}</h3>
            <div>
              <h5>Experience: {_.get(pathologist,'experience','')}</h5>
              <h5>ICMR: {_.get(pathologist,'ICMRregistrationId','')}</h5>
            </div>
          </div>
        </div>
        {hoveredData === pathologist._id ? (
          <div
          onClick={() => setModalData({...modalData,show: true, info: pathologist})}
            style={{
              height: "120px",
              margin: "10px",
              position: "absolute",
              cursor: "pointer",
              top: 0,
              width: "60%",
              borderRadius: "20px",
              backgroundColor: "rgba(0,0,0,0.8)",
              boxShadow: "rgb(255 255 255 ) 0px 0px 5px -1px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsEye style={{ fontSize: 35, color: "#fff" }} />
          </div>
        ) : null}
    
      </div>
    );
  }
  console.log(pathologistList);
  const getPatientServices = () => {
    Promise.all([getPatientServiceById(_.get(getUserData(),"_id",""), "Pending"), getPatientServiceById(_.get(getUserData(),"_id",""), "Confirmed"), getPatientServiceById(_.get(getUserData(),"_id",""), "Rejected")]).then(res => {
      console.log(res,'res...')
      const all = _.map(res, eachRes => _.get(eachRes,'data.data'))
      console.log(_.flatMap(all),'all')
      setAllServices(_.flatMap(all))

    })
    // getPatientServiceById(_.get(getUserData(),"_id",""), "Pending").then(res => {
    //   console.log("result",res)
    // })
  }
  useEffect(() => {
    getListOfPathologists();
    getPatientServices()
  }, []);

  return (
    <div className="dashboard__main__container">
      <div className="dashboard__main__header">
        <h3>Dashboard</h3>
      </div>
      <div className="dashboard__main__content">

        <div className="dashboard__main__one">
          <div className="dashboard__main__oneA">
            <OneA services={allServices}/>
          </div>
          <div className="dashboard__main__oneB">
            <div  style={{backgroundColor: "#1F2833",marginLeft: "80px",height: 300, width: 400}}>
              <h3  className="pb-3 text-white">Total Uploaded Samples :</h3>
              <h1 className="pb-3 text-white text-center p-3">54</h1>
            </div>
          </div>
        </div>
        <div className="dashboard__main__two">
         <h3  className="pb-3 ml-4 text-white" style={{marginLeft: "80px"}}>Pathologists :</h3>
         <div className="dashboard__main__twoA" style={{overflowY: 'auto'}}>
         {pathologistList.map(e => {
           return <PathologistItem pathologist={e}/>
         })}
         </div>
        </div>

      </div>
             <ModalComponent title="Pathologist Details" hideSaveBtn modalData={modalData} setModalData={setModalData} >
            <div style={{width:"auto", height: "auto"}}>

              <div className="d-flex justify-content-between mx-2">
                <div style={{width:"200px", height: "200px", border: "2px solid #66fcf1", borderRadius: "5px"}}>
                 <img src={`${baseUrl}/${_.get(modalData,'info.image')}`} height="200px" width="200px" alt="pathologist_img" style={{objectFit:'cover'}}/>
                </div>
                <div style={{height: "200px"}} className="d-flex align-items-center flex-column justify-content-center">
                  <h3 className="text-white">
                    {_.get(modalData,'info.firstName','fName')} {_.get(modalData,'info.lastName','lName')}
                  </h3>
                  <h5 style={{color:"#66fcf1"}}>
                    {_.get(modalData,'info.ICMRregistrationId','ICMR')} 
                  </h5>

                </div>
              </div>

              <div className="mt-4">
                <h4 className="d-flex w-100 justify-content-evenly flex-direction-row">
                  <div className="w-50 pl-3">Designation:</div>
                  <div  className="w-50" style={{overflowWrap:"anywhere",color:"#66fcf1"}}>{_.get(modalData,'info.designation','')}</div>
                </h4>
                <h4 className="d-flex w-100 justify-content-evenly flex-direction-row">
                  <div className="w-50">Experience:</div>
                  <div  className="w-50" style={{overflowWrap:"anywhere",color:"#66fcf1"}}>{_.get(modalData,'info.experience','')}</div>
                </h4>

                <h4 className="d-flex w-100 justify-content-evenly flex-direction-row">
                  <div className="w-50">Phone:</div>
                  <div  className="w-50" style={{overflowWrap:"anywhere",color:"#66fcf1"}}>{_.get(modalData,'info.phone','')}</div>
                </h4>
                <h4 className="d-flex w-100 justify-content-evenly flex-direction-row">
                  <div className="w-50">Email:</div>
                  <div className="w-50" style={{overflowWrap:"anywhere",color:"#66fcf1"}}>{_.get(modalData,'info.email','')}</div>
                </h4>

              </div>

  
            </div>
        </ModalComponent>
   
    </div>
  );
}

export default PatientDashboardMain;
