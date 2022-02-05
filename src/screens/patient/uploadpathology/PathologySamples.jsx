import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import "./uploadpathology.css";
const PathologySamples = () => {
  const [modalData, setModalData] = useState({
    show: false,
    info: {},
  });
  const item = {
    uploadedDate: "12-02-2022",
    name: "Sample Image",
    id: "324253243",
  };
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
      <ModalComponent modalData={modalData} setModalData={setModalData}>
        {/* <h3 className="text-white">lskdjf</h3> */}
            <div style={{height:"100%", width:"100%", display:'flex', justifyContent:'center', alignItems:"center"}}>
        <ImageUpload hidelabel={true}>

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
            <span>Drag or upload the image</span>
          </div>
        </ImageUpload>
            </div>
      </ModalComponent>
    </div>
  );
};

export default PathologySamples;
