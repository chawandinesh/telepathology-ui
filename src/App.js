import React, { useState } from "react";
import { storage } from "./firebase/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//503 Service unavailable
// import { app } from "./firebase";
import AppRoutes from "./routes/Routes";

import "./styles.css";
function App() {
  const [uploadImage, setUploadImage] = useState(null);
  const handleImage = (e) => {
    const image = e.target.files[0];
    setUploadImage(image);
    //  storage.ref(`/images/${image.name}`).put(image)
    // .on("state_changed" , alert("success") , alert);
  };

  const uploadImageToFireStore = () => {
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
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log("File available at", downloadURL);
          if(downloadURL){
            await fetch(downloadURL).then(res => {
               console.log(res)
             }).catch(err => {
               console.log(err)
             })
          }
        });
      }
    );
  };

  // return (
  //   <div>
  //     <h1>Pathology upload</h1>
  //     <input type="file" accept="image/*" onChange={handleImage} />
  //     <button onClick={uploadImageToFireStore}>Upload image</button>
  //   </div>
  // );
  return <AppRoutes />;
}

export default App;
