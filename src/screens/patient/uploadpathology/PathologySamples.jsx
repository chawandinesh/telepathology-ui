import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import { addReportFile, baseUrl, getUserById } from "../../../helpers/helpers";
import _ from 'lodash'
import "./uploadpathology.css";
import ToastComponent from "../../../components/ToastComponent";
const PathologySamples = () => {
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  console.log(file,'file...');
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
    const userId = _.get(JSON.parse(localStorage.getItem("user")),'_id')
    getUserById(userId).then(res => {
      console.log(res,'res..');
      setCurrentUser(_.get(res,'data.data',''))
    }).catch((err) => {
      console.log(err,'error');
    })
  }

  useEffect(() => {
   getCurrentLoginUserData()
  }, []);
  

  const postReportFile = () => {
    setModalData({...modalData,show: false})
    formData.append("reportFile", file)
    formData.append("data", JSON.stringify({id: _.get(currentUser,'_id',''),oldimage: _.get(currentUser,'reportFile','')}))
    addReportFile(formData).then(res => {
      console.log(res,'res..');
      setFile(null)
      setState({
        ...state,
        type:"success",
        show:true,
        message:"successfully uploaded"
      })
    
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
  const url = file ? URL.createObjectURL(file) : _.get(currentUser,'reportFile') ? `${baseUrl}/${_.get(currentUser,'reportFile','')}` :null
   console.log(url)
  return (
    <div className="upload__pathology__container">
      <div className="dashboard__main__header">
        <h3>Pathology Sample</h3>
      </div>
      <div className="w-100  d-flex justify-content-end" style={{ height: "13%" }}>
        <button
          className="btn  btn-primary"
          style={{ marginRight: "30px", background: "black", borderColor: "#3F706E" }}
          onClick={() => {
            setModalData({ ...modalData, show: true, info: item });
          }}
        >
          Upload Pathology sample
        </button>
      </div>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Uploaded Date</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 234232, 4324, 23, 12, 3434, 34343, 5454, 34232, 3424, 4535, 3542].map((e, idx) => (
            <tr>
              <td>{idx}</td>
              <td>{item.uploadedDate}</td>
              <td>{item.name}</td>
              <td>
                <FaEye style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalComponent modalData={modalData} handleSubmit= {postReportFile} setModalData={setModalData}>
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
      <ToastComponent setState={setState} state={state}  />
    </div>
  );
};

export default PathologySamples;
