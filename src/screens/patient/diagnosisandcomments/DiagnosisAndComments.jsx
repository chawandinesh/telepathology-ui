import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import SImg from '../../../assets/images/recovered.png'
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import { addReportFile, baseUrl, getPathologistById, getPatientById, getUserData } from "../../../helpers/helpers";
import _ from 'lodash'
import "../uploadpathology/uploadpathology.css";
import ToastComponent from "../../../components/ToastComponent";
const PathologySamples = () => {
  const [file, setFile] = useState(null);
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

  console.log(currentUser,'currentuser')
  useEffect(() => {
   getCurrentLoginUserData()
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
      <div className="dashboard__main__header">
      <h3>Diagnosis and Comments</h3>
      </div>
      <div className="w-100  d-flex justify-content-end" style={{ height: "10%" }}>
      
      </div>
      <h4 className="text-white" style={{paddingLeft:"20px",textDecoration:'underline'}}>Pathologist Comments :</h4>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Uploaded Date</th> */}
            <th>Name</th>
            <th>comments</th>
          </tr>
        </thead>
        <tbody>
          {
            _.size(_.get(currentUser,'reportFile','')) ?
          
          _.map(_.get(currentUser,'reportFile'),(e, idx) => {
            const fileName= e.filePath.slice(e.filePath.indexOf("/")+1,e.filePath.indexOf("."))
            const name = `sample_${fileName.slice(fileName.indexOf("_")+1, fileName.indexOf("."))}`
            return(
            <tr>
              <td>{idx+1}</td>
              {/* <td>{item.uploadedDate}</td> */}
              <td>{name}</td>
              <td>
              <td>{!e.comment ? "no comment given" : e.comment}</td>
                {/* <FaEye style={{ cursor: "pointer" }} onClick={() => setViewModal({...viewModal,show:true,info: e})} /> */}
              </td>
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


// import React from "react";
// import { Table } from "react-bootstrap";

// const DiagnosisAndComments = () => {
//     const item = {
//         uploadedDate: "12-02-2022",
//         name: "Sample Image",
//         image:() => (<span className="p-2 border 1px solid #000">testsuer</span>),
//         comment: "test comment...",
//       };
//   return (
//     <div className="upload__pathology__container">
//       <div className="dashboard__main__header">
//         <h3>Diagnosis and Comments</h3>
//       </div>
//       <Table striped bordered hover responsive variant="dark">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Uploaded Date</th>
//             <th>Name</th>
//             <th>comment</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[1, 2, 234232, 4324, 23, 12, 3434, 34343, 5454, 34232, 3424, 4535, 3542].map((e, idx) => (
//             <tr>
//               <td>{idx}</td>
//               <td>{item.uploadedDate}</td>
//               <td>{item.name}</td>
//               <td>{item.comment}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default DiagnosisAndComments;
