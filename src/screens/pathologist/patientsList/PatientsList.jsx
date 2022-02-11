import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import SImg from '../../../assets/images/recovered.png'
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import { addReportFile, baseUrl, getAllPatients, getPathologistById, getPatientById, getUserData } from "../../../helpers/helpers";
import _ from 'lodash'
import "../../patient/uploadpathology/uploadpathology.css";
import ToastComponent from "../../../components/ToastComponent";
const PathologySamples = () => {
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const [viewModal, setViewModal] = useState({
    show: false,
    info: {},
  });

  const [modalData, setModalData] = useState({
    show: false,
    info: {},
  });
  const [state, setState] = useState({
    show: false,
    type:"",
    message:""
  });
  const item = {
    uploadedDate: "12-02-2022",
    name: "Sample Image",
    id: "324253243",
  };
  const formData = new FormData()

  const getCurrentLoginUserData = () => {
    const userId = _.get(getUserData(),'_id')
    getPatientById(userId).then(res => {
      setCurrentUser(_.get(res,'data.data',''))
    }).catch((err) => {
      console.log(err,'error');
    })
  }

  
  const getAllPatientsData = () => {
    getAllPatients().then((res) => {
      const patientsList =  _.get(res, "data.data");
      setPatients(patientsList);
    });
  };

  useEffect(() => {
    getAllPatientsData();
  }, []);
  

  const postReportFile = () => {
    setModalData({...modalData,show: false})
    formData.append("reportFile", file)
    formData.append("data", JSON.stringify({_id: _.get(getUserData(),'_id','')}))
    addReportFile(formData).then(res => {
      setFile(null)
      setState({
        ...state,
        type:"success",
        show:true,
        message:"successfully uploaded"
      })
      getCurrentLoginUserData()
    
    }).catch((err) => {
      console.log(err);
      setState({
        ...state,
        type:"danger",
        show:true,
        message:"Failed to upload"
      })
    })
  }
  const url = file ? URL.createObjectURL(file) : null
  
  return (
    <div className="upload__pathology__container">
        <div className="dashboard__main__header mt-3">
        <h3>Patients List</h3>
      </div>
      <div className="w-100  d-flex justify-content-end" style={{ height: "10%" }}></div>
      <h4 className="text-white" style={{ paddingLeft: "20px", textDecoration: "underline" }}>
        Patients :
      </h4>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="w-100">
            <th  className="w-25">#</th>
            {/* <th>Uploaded Date</th> */}
            <th className="w-25">Name</th>
            <th className="w-25">ABHA Health id</th>
            <th className="w-25">Email</th>
          </tr>
        </thead>
        <tbody>
          {
            _.size(patients) ?
          
          _.map(patients,(e, idx) => {
            return(
            <tr className="w-100">
              <td className="w-25">{idx+1}</td>
              {/* <td>{item.uploadedDate}</td> */}
              <td className="text-center" className="w-25">{`${e.firstName} ${e.lastName}`}</td>
              <td className="text-center" className="w-25">{e.ABHAHealthId}</td>
              <td className="text-center" className="w-25">{e.email}</td>
             <td/>
             {/* <td/> */}
            </tr>
          )})
          :
          <h4 className="mt-3 text-center">No Samples found</h4>
        }
        </tbody>
      </Table>
      <ModalComponent title="Upload Sample Image" modalData={modalData} handleSubmit= {postReportFile} setModalData={setModalData}>
        {/* <h3 className="text-white">lskdjf</h3> */}
            <div style={{height:"100%", width:"100%", display:'flex', justifyContent:'center', alignItems:"center"}}>
        <ImageUpload hidelabel={true}
         file ={file}
         setFile={setFile}
         fileName={''}
         hidelabel={true}
        >

          <div
            style={{
              width: "250px",
              height: "180px",
              border: "2px solid #3F706E",
              textAlign: "center",
              display: "flex",
              justifyContent:'center',
              alignItems: "center",
            }}
          >
          { url ? <img src={url} alt="noimage" height="100%" width="100%"/> :  <span>Drag or upload the image</span> }
          </div>
        </ImageUpload>
            </div>
      </ModalComponent>
      <ModalComponent hideSaveBtn title="Sample Details" modalData={viewModal}  setModalData={setViewModal}>
        <div style={{width:"90%",height:"90%", display:"flex", justifyContent:"center", alignItems:'center'}}>
          <img src={`${baseUrl}/${viewModal.info.filePath}`} width="100%" height="100%" alt="noimg"/>
        </div>
      </ModalComponent>
      <ToastComponent setState={setState} state={state}  />
    </div>
  );
};

export default PathologySamples;

