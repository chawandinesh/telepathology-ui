import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import SImg from "../../../assets/images/recovered.png";
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import { addClassificationFile, addReportFile, baseUrl, getPathologistById, getPatientById, getUserData } from "../../../helpers/helpers";
import _ from "lodash";
import "./uploadClassification.css";
import ToastComponent from "../../../components/ToastComponent";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";

const PahologyClassification = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pathologyUpload, setPathologyUpload] = useState({ loading: false, image: null, error: false });
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
  const item = {
    uploadedDate: "12-02-2022",
    name: "Sample Image",
    id: "324253243",
  };
  const formData = new FormData();

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const getCurrentLoginUserData = () => {
    const userId = _.get(getUserData(), "_id");
    getPatientById(userId)
      .then((res) => {
        setCurrentUser(_.get(res, "data.data", ""));
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  console.log(currentUser, "currentuser");
  useEffect(() => {
    getCurrentLoginUserData();
  }, []);

  console.log(pathologyUpload);

  const uploadImageToFireStore = (uploadImage) => {
    setLoading(true);
    const uploadTask = storage.ref(`newimage.png`).put(uploadImage);
    // .getDownloadURL()
    // console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("File available at", downloadURL);
          const url = "https://breast--cancer--classification.herokuapp.com/send-image/";
          if (downloadURL) {
            setPathologyUpload({ loading: true, image: null, error: false });
            await axios.get(url)
              .then((res) => {
                setPathologyUpload({ loading: false, image: res, error: false });
                console.log(res.data,'result...')
                if(res.data){
                    setModalData({ ...modalData, show: false })
                    formData.append("classificationFile", file);
                    formData.append("data",JSON.stringify({ _id: _.get(getUserData(), "_id", "") , ...res.data}))
                    addClassificationFile(formData)
                    .then((res) => {
                      setFile(null);
                      setLoading(false);
                      setState({
                        ...state,
                        type: "success",
                        show: true,
                        message: "successfully uploaded",
                      });
                      getCurrentLoginUserData();
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoading(false);
                      setState({
                        ...state,
                        type: "danger",
                        show: true,
                        message: "Failed to upload",
                      });
                    });

                }
                // setModalData({ ...modalData, show: false });
                //   formData.append("reportFile", file);
                //   formData.append("data", JSON.stringify({ _id: _.get(getUserData(), "_id", "") }));
                //   addReportFile(formData)
                //     .then((res) => {
                //       setFile(null);
                //       setLoading(false);
                //       setState({
                //         ...state,
                //         type: "success",
                //         show: true,
                //         message: "successfully uploaded",
                //       });
                //       getCurrentLoginUserData();
                //     })
                //     .catch((err) => {
                //       console.log(err);
                //       setLoading(false);
                //       setState({
                //         ...state,
                //         type: "danger",
                //         show: true,
                //         message: "Failed to upload",
                //       });
                //     });
                

                 
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
                setState({ ...state, show: true, message: "Failed to upload", type: "danger" });
                setPathologyUpload({ loading: false, image: null, error: true });
              });
          }
        });
      }
    );
  };

  const postReportFile = () => {
    console.log("reportfile", file);
    uploadImageToFireStore(file);
  };
  const url = file ? URL.createObjectURL(file) : null;

  return (
    <div className="upload__pathology__container">
      <div className="dashboard__main__header">
        <h3>Pathology Histology</h3>
      </div>
      <div className="w-100  d-flex justify-content-end" style={{ height: "13%" }}>
        <button
          className="btn  btn-primary"
          style={{ marginRight: "30px", background: "black", borderColor: "#3F706E" }}
          onClick={() => {
            setModalData({ ...modalData, show: true, info: item });
          }}
        >
          Upload patient histology
        </button>
      </div>

      <h4 className="text-white" style={{ paddingLeft: "20px", textDecoration: "underline" }}>
        Previously uploaded histologies :
      </h4>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="text-center">
            <th>#</th>
            {/* <th>Uploaded Date</th> */}
            <th>Name</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {_.size(_.get(currentUser, "classificationFile", "")) ? (
            _.map(_.get(currentUser, "classificationFile"), (e, idx) => {
              const fileName = e.filePath.slice(e.filePath.indexOf("/") + 1, e.filePath.indexOf("."));
              const name = `histology_${fileName.slice(fileName.indexOf("_") + 1, fileName.indexOf("."))}`;
              console.log(e,'evalue');
              return (
                <tr className="text-center">
                  <td >{idx + 1}</td>
                  <td>{name}</td>
                  <td >{_.get(e,"Model_Prediction","")}</td>
                  <td>
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setViewModal({ ...viewModal, show: true, info: e })}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <h4 className="mt-3 text-center">No Samples found</h4>
          )}
        </tbody>
      </Table>
      <ModalComponent
        title="Upload Sample Image"
        modalData={modalData}
        handleSubmit={postReportFile}
        setModalData={setModalData}
      >
        {/* <h3 className="text-white">lskdjf</h3> */}
        <div
          style={{
            height: "100%",
            marginTop: 29,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageUpload hidelabel={true} file={file} setFile={setFile} fileName={""}>
            <div
              style={{
                width: "250px",
                height: "180px",
                border: "2px solid #3F706E",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <h3>
                  {" "}
                  <Spinner animation="grow" variant="light" /> Loading..
                </h3>
              ) : url ? (
                <img src={url} alt="noimage" height="100%" width="100%" />
              ) : (
                <span>Drag or upload the image</span>
              )}
            </div>
          </ImageUpload>
        </div>
        {/* <div className="d-flex justify-content-center align-items-center">
             <p></p>
              <input />
        </div> */}
      </ModalComponent>
      <ModalComponent hideSaveBtn title="Sample Details" modalData={viewModal} setModalData={setViewModal}>
        <div style={{ width: "90%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={`${baseUrl}/${viewModal.info.filePath}`} width="100%" height="100%" alt="noimg" />
        </div>
      </ModalComponent>
      {pathologyUpload.error ? <p className="text-danger">Something went wrong</p> : null}
      <ToastComponent setState={setState} state={state} />
    </div>
  );
};

export default PahologyClassification;
