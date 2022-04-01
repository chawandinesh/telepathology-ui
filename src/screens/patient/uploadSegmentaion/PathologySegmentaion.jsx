import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import SImg from "../../../assets/images/recovered.png";
import ImageUpload from "../../../components/ImageUpload";
import ModalComponent from "../../../components/ModalComponent";
import { addReportFile, baseUrl, getPathologistById, getPatientById, getUserData } from "../../../helpers/helpers";
import _ from "lodash";
import "../uploadpathology/uploadpathology.css";
import ToastComponent from "../../../components/ToastComponent";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL } from "firebase/storage";
import TestImage from "../../../assets/images/testsample.png";
const PathologySegmentation = () => {
  const [file, setFile] = useState(null);
  const segmentRef = React.createRef();
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
  const [loadingShow, setLoadingShow] = useState(false);
  const [loadingSuccess, setLoadingSuccess] = useState(false);

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
    const uploadTask = storage.ref(`image`).put(uploadImage);
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
          const url = "https://histolog-segmenter.herokuapp.com/send-image/";
          if (downloadURL) {
            setPathologyUpload({ loading: true, image: null, error: false });
            await fetch(url)
              .then((res) => {
                setPathologyUpload({ loading: false, image: res, error: false });
                //  toDataURL(res.u)
                // https://histolog-segmenter.herokuapp.com/send-image/
                toDataURL(res.url).then((dataUrl) => {
                  console.log("Here is Base64 Url", dataUrl);
                  var file = dataURLtoFile(dataUrl, "imageName.jpg");
                  console.log("Here is JavaScript File Object", file);
                  //      fileArr.push(fileData)

                  setModalData({ ...modalData, show: false });
                  formData.append("reportFile", file);
                  formData.append("data", JSON.stringify({ _id: _.get(getUserData(), "_id", "") }));
                  addReportFile(formData)
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
                });
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
  const handleImage = (e) => {
    setLoadingSuccess(false);
    if (e.target.files[0]) {
      setLoadingShow(true);
      setTimeout(() => {
        setLoadingShow(false);
        setLoadingSuccess(true);
      }, 20000);
    }
  };
  const handleLoading = () => {
    segmentRef.current.click();
  };

  return (
    <div className="upload__pathology__container">
      <div className="dashboard__main__header">
        <h3>Pathology Segmentation</h3>
      </div>

      <div className="w-100  d-flex justify-content-center align-items-center flex-column">
        <div>
          <button
            className="btn  btn-primary mt-4 mb-4"
            style={{ marginRight: "30px", background: "black", borderColor: "#3F706E" }}
            onClick={handleLoading}
          >
            Upload Pathology sample
          </button>
        </div>

        <div
          style={{ height: "300px", width: "500px", border: "1px solid #fff" }}
          className="d-flex justify-content-center align-items-center"
        >
          {loadingShow ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="p-2">
                <Spinner animation="grow" variant="light" />
              </div>
              <h5 className="text-center text-white ml-2">Segmentation is Processing...</h5>
            </div>
          ) : loadingSuccess ? (
            <img height="300px" width="500px" src={TestImage} />
          ) : (
            <p className="text-white">No Image</p>
          )}
        </div>
      </div>
      <input type="file" className="d-none" accept="image/*" ref={segmentRef} onChange={handleImage} />
    </div>
  );
};

export default PathologySegmentation;
