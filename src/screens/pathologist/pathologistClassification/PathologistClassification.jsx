import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import SImg from "../../../assets/images/recovered.png";
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import {
  addReportFile,
  baseUrl,
  getAllPatients,
  getPathologistById,
  getPatientById,
  getUserData,
  updatePatient,
} from "../../../helpers/helpers";
import _ from "lodash";
import "../../patient/uploadpathology/uploadpathology.css";

import ToastComponent from "../../../components/ToastComponent";
const PathologistClassification = () => {
  const [patients, setPatients] = useState([]);
  const [status,setStatus] = useState({
    type:"",
    message:'',
    show: false
  })

  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("")
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
    type: "",
    message: "",
  });

  const formData = new FormData();

  const getAllPatientsData = () => {
    getAllPatients().then((res) => {
      const onlyReportFiles = _.filter(_.get(res, "data.data"), (each) => _.size(each.reportFile));
      setPatients(onlyReportFiles);
    });
  };

  useEffect(() => {
    getAllPatientsData();
  }, []);


  const patientFormData = new FormData()
  const handleSubmit = () => {
    const find = viewModal.info.all.reportFile.findIndex(e => e._id === viewModal.info.file._id)
    viewModal.info.all.reportFile[find].comment = comment
    patientFormData.append("data", JSON.stringify(_.get(viewModal,'info.all')))
    setViewModal({...viewModal,show:false})
    updatePatient(patientFormData).then(res => {
      setStatus({
        show: true,
        type: "success",
        message: "Updated successfully"
      })
    }).catch(err => {
      setStatus({
        show: true,
        type: "danger",
        message: "Failed to update"
      })
    })
    // viewModal.info.all.reportFile.indexOf()
  }

  const RenderFiles = ({e}) => {
      console.log(e,'evalue')
      return(
    <div>
       {_.map(_.get(e, "classificationFile"), (eachFile) => {
           console.log(eachFile)
                      const fileName = eachFile.filePath.slice(
                        eachFile.filePath.indexOf("/") + 1,
                        eachFile.filePath.indexOf(".")
                      );
                      const name = `classification_${fileName.slice(fileName.indexOf("_") + 1, fileName.indexOf("."))}`;
                      return (
                        <div style={{display:'flex', justifyContent:'space-between', width:"240px"}}>
                          <div >
                            <span>{name}</span>
                        
                          </div>
                          <div >
    
                            <FaEye
                              style={{ cursor: "pointer", marginLeft: "10px" }}
                              onClick={() => setViewModal({ ...viewModal, show: true, info: {all:e,file:eachFile, class: eachFile.Model_Prediction} })}
                            />
                          </div>
                       
                
                        </div>
                      );
                    })}
    </div>
  )}

  return (
    <div className="upload__pathology__container mt-4">
      <div className="dashboard__main__header">
        <h3>Pathology Classifications:</h3>
      </div>
      <div className="w-100  d-flex justify-content-end" style={{ height: "10%" }}></div>
      <h4 className="text-white" style={{ paddingLeft: "20px", textDecoration: "underline" }}>
        Classifications :
      </h4>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Uploaded Date</th> */}
            <th>Name</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {_.size(patients) ? (
            _.map(patients, (e, idx) => {
              // const fileName= e.filePath.slice(e.filePath.indexOf("/")+1,e.filePath.indexOf("."))
              // const name = `sample_${fileName.slice(fileName.indexOf("_")+1, fileName.indexOf("."))}`
              return (
                <tr>
                  <td>{_.get(e, "_id")}</td>
                  {/* <td>{item.uploadedDate}</td> */}
                  <td>{`${_.get(e, "firstName")} ${_.get(e, "lastName")}`}</td>
                  <td>
                   <RenderFiles e={e}/>
                    {/* <td>{!e.comment ? "no comment given" : e.comment}</td> */}
                    {/* <FaEye style={{ cursor: "pointer" }} onClick={() => setViewModal({...viewModal,show:true,info: e})} /> */}
                  </td>
                </tr>
              );
            })
          ) : (
            <h4 className="mt-3 text-center">No Reports found</h4>
          )}
        </tbody>
      </Table>

      <ModalComponent handleSubmit={handleSubmit}  title={viewModal.info.class} modalData={viewModal} setModalData={setViewModal}>
        <div style={{ width: "80%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={`${baseUrl}/${_.get(viewModal,"info.file.filePath")}`} width="100%" height="100%" alt="noimg" />
        </div>
        <div style={{height: "10%"}}>
        {/* <Form.Group className="mb-2" controlId="formBasicEmail">
      <Form.Label>Comment</Form.Label>
    <Form.Control onChange={(e) => setComment(e.target.value)} type="text" placeholder="Enter comment" />

  </Form.Group> */}
        </div>
      </ModalComponent>
      <ToastComponent setState={setStatus} state={status} />
    </div>
  );
};

export default PathologistClassification;

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
