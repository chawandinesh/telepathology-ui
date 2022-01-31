import React, { useState } from "react";

function ImageComponent({ register }) {
  const imageRef = React.createRef();
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="d-flex align-items-center justify-content-around mb-3">
      <div className="sample__image__bg">
        {image ? <img src={image} alt="noPatientImage" height="100%" width="100%" /> : <div>No image</div>}
      </div>
      <div>
        <button type="button" className="btn btn-primary primary__btn" onClick={() => imageRef.current.click()}>
          Add image
        </button>
        <input
          type="file"
          className="d-none"
          {...register("pic")}
          ref={imageRef}
          accept="image/*"
          onChange={handleImage}
        />
      </div>
    </div>
  );
}

export default ImageComponent;
