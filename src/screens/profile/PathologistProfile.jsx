import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { baseUrl, getPatientById, getUserData,getPathologistById } from '../../helpers/helpers'
import '../patient/uploadpathology/uploadpathology.css'
import userImage from '../../assets/images/user.png'
import * as yup from "yup";
import ModalComponent from '../../components/ModalComponent'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import TextFieldComponent from '../../components/TextFieldComponent'
import ImageUpload from '../../components/ImageUpload'
import RadioComponent from '../../components/RadioComponent'
import DatePickerComponent from '../../components/DatePickerComponent'
import TextAreaComponent from '../../components/TextAreaComponent'
import SelectComponent from '../../components/SelectComponent'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const PathologistProfile = () => {
  const pathologistSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    email: yup.string().email().required("Email is required"),
    designation: yup.string().required("Designation is required"),
    experience: yup.string().required("Experience is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
    height: yup.number().typeError("Must be a number").required("Required"),
    weight: yup.number().typeError("Must be a number").required("Required"),
    emergencyFirstName: yup.string().required("Emergency First Name is Required"),
    emergencyLastName: yup.string().required("Emergency Last Name is Required"),
    emergencyRelationship: yup.string().required("Emergency Relationship is Required"),
    emergencyPhone: yup.string().required("Emergency Phone is Required"),
  });
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(pathologistSchema) });
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "all",
      placeholder: "all",
    },
    { name: "gender", label: "Gender", type: "radio" },
    { name: "email", label: "Email", type: "email", placeholder: "Email" },
    { name: "phone", label: "Phone", type: "phone", placeholder: "Phone" },
    {name: "designation", label: "Designation", type: "text", placeholder: "Designation"},
    {name: "experience", label: "Experience", type: "text", placeholder: "Experience"},
    {
      name: "address",
      label: "Address",
      type: "textArea",
      placeholder: "Address",
    },
    { name: "weight", label: "Weight", type: "number", placeholder: "Weight" },
    {
      name: "maritalstatus",
      label: "Marital Status",
      type: "select",
      options: [
        { label: "Single", name: "single" },
        { label: "Married", name: "married" },
      ],
      placeholder: "Marital Status",
    },
    { name: "image", label: "Profile Image", type: "image" },
  ];

  const emergencyFields = [
    {
      name: "emergencyFirstName",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
    },
    {
      name: "emergencyLastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
    },
    {
      name: "emergencyRelationship",
      label: "Relationship",
      type: "text",
      placeholder: "Relationship",
    },
    {
      name: "emergencyPhone",
      label: "Phone",
      type: "text",
      placeholder: "Phone",
    },
  ];

  const [file, setFile] = useState([])

  const submitRef = React.createRef(null)
  const [modalData, setModalData] = useState({show: false})
  const [editLoading, setEditLoading] = useState(false)
  const [user, setuser] = useState({})
  const getProfile = () => {
    const id = _.get(getUserData(),"_id")
    if(id){
      getPathologistById(id).then(res => {
        setuser(_.get(res,'data.data',''))
      })
    }
  }

  useEffect(() => {
    getProfile()
  }, [])
  const formData = new FormData()
  const onSubmit = (e) => {
    console.log(e,file)
    if (file) {
      formData.append("image", file);
    }
    formData.append("data", JSON.stringify(e));
  }
  useEffect(() => {
    const dataValues = _.omit(user,["ICMRregistrationId","dob","createdAt","password","reportFile","updatedAt","_v","_id"])
    _.forOwn(dataValues,(value,key) => {
      setValue(key,value)
    })
  },[modalData.show])

  
  return (
    <div className="upload__pathology__container">
    <div className="dashboard__main__header">
      <h3>Profile</h3>
    </div>
    <div style={{width: "95%",display:'flex',justifyContent:"flex-end",marginTop: 10}}>
      <button onClick={() => setModalData({...modalData,show: true})} className='btn' style={{color:"#fff", backgroundColor:"#1F2833",boxShadow: "rgb(153 153 153) 1px 2px 6px 4px"}}>
        Edit Profile
      </button>
    </div>
    <div className="user__container" style={{ width: "100%", display: "flex" }}>
        <div className="left">
          <div className="basic__details">
            <span className="details__title">BASIC DETAILS</span>
            <div className="profile__image__name">
              <div className="profile__background">
                {_.get(user, "image") ? (
                  <img
                    style={{ borderRadius: "50%", height: "100%", width: "100%" }}
                    src={`${baseUrl}/${_.get(user, "image")}`}
                    alt="profileimage"
                  />
                ) : (
                  <img
                    style={{ borderRadius: "50%", backgroundColor: "#fff", height: "100%", width: "100%" }}
                    src={userImage}
                    alt="profileimage"
                  />
                )}
              </div>
              <div className="profile__name__content">
                <h3>
                  {_.get(user, "firstName", "FName")} {_.get(user, "lastName", "LName")}
                </h3>
                <h5 style={{color:"#66fcf1"}}>{_.get(user, "ICMRregistrationId", "")}</h5>
              </div>
            </div>
            <div className="text-white " style={{ marginLeft: "50px", marginTop: "30px" }}>
              <h5 className="p-2">Email: <span style={{color:"#66fcf1"}}>{_.get(user, "email", "")}</span></h5>
              <h5 className="p-2">Phone: <span style={{color:"#66fcf1"}}>{_.get(user, "phone", "")}</span></h5>
              <h5 className="p-2">address: <span style={{color:"#66fcf1"}}>{_.get(user, "address", "")}</span></h5>
            </div>
          </div>
        </div>
        <div className="right">
          <div className='professional__details'>
         <span className="details__title">PROFESSIONAL DETAILS</span>
         <div className="text-white " style={{ marginLeft: "50px", marginTop: "30px" }}>
             <h5 className="p-2">ICMRregistrationID: <span style={{color:"#66fcf1"}}>{_.get(user, "ICMRregistrationId", "")}</span></h5>
              <h5 className="p-2">Designation: <span style={{color:"#66fcf1"}}>{_.get(user, "designation", "")}</span></h5>
              <h5 className="p-2">Experience: <span style={{color:"#66fcf1"}}>{_.get(user, "experience", "")}</span></h5>

         </div>
    
         </div>
          <div className="emergency__details">
            <span className="details__title">EMERGENCY DETAILS</span>
            <div className="text-white " style={{ marginLeft: "50px", marginTop: "30px" }}>
              <h5 className="p-2">First Name: <span style={{color:"#66fcf1"}}>{_.get(user, "emergencyFirstName", "")}</span></h5>
              <h5 className="p-2">Last Name: <span style={{color:"#66fcf1"}}>{_.get(user, "emergencyLastName", "")}</span></h5>
              <h5 className="p-2">RelationShip: <span style={{color:"#66fcf1"}}>{_.get(user, "emergencyRelationship", "")}</span></h5>
              <h5 className="p-2">Phone: <span style={{color:"#66fcf1"}}>{_.get(user, "emergencyPhone", "")}</span></h5>
            </div>
          </div>
        </div>
        {/* <div className='user'>
         <div style={{color:"#fff"}}>
           {
               _.get(user,'image') ?
               <img height="200px" width="200px" style={{borderRadius:"50%"}} src={`${baseUrl}/${_.get(user,'image')}`} alt="profileimage"/>
  
               :
               <img height="200px" width="200px" style={{borderRadius:"50%",backgroundColor:"#fff"}} src={userImage} alt="profileimage"/>
              
           }
         </div>
          <div style={{color:"white", textAlign:'center'}}>
            <h3 className='p-2'>{`${_.get(user,'firstName','')} ${_.get(user,'lastName','')} ` }</h3>
            <p className='m-0 py-2'>{_.get(user,'email')}</p>
            <p className='m-0 py-1'>ABHA ID: {_.get(user,'ABHAHealthId')}</p>
            <p className='m-0 py-1'>DOB: {moment(_.get(user,'dob')).format("DD-MM-YYYY")}</p>
            <p className='m-0 py-1'>Blood Group: {_.get(user,'bloodgroup')}</p>
            <p className='m-0 py-1'>Phone: {_.get(user,'phone')}</p>

          </div>
       </div> */}
      </div>
     {/* <div className='user__container' style={{width: "100%", display:'flex', justifyContent:'center'}}>
       <div className='user'>
         <div style={{color:"#fff"}}>
           {
               _.get(user,'image') ?
               <img height="200px" width="200px" style={{borderRadius:"50%"}} src={`${baseUrl}/${_.get(user,'image')}`} alt="profileimage"/>
  
               :
               <img height="200px" width="200px" style={{borderRadius:"50%",backgroundColor:"#fff"}} src={userImage} alt="profileimage"/>
              
           }
         </div>
          <div style={{color:"white", textAlign:'center'}}>
            <h3 className='p-2'>{`${_.get(user,'firstName','')} ${_.get(user,'lastName','')} ` }</h3>
            <p className='m-0 py-2'>{_.get(user,'email')}</p>
            <p className='m-0 py-1'>ICMR ID: {_.get(user,'ICMRregistrationId')}</p>
            <p className='m-0 py-1'>DOB: {moment(_.get(user,'dob')).format("DD-MM-YYYY")}</p>
            <p className='m-0 py-1'>Blood Group: {_.get(user,'bloodgroup')}</p>
            <p className='m-0 py-1'>Phone: {_.get(user,'phone')}</p>

          </div>
       </div>
     </div> */}
     <ModalComponent hideSaveBtn  refVal={submitRef} modalData={modalData} setModalData={setModalData} title="Edit Profile" >
     <div className="patient__form__container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {_.map(fields, (eachField) => {
              const { type, label, placeholder, name } = eachField;
              return (
                <>
                  {eachField.name === "name" ? (
                    <Row>
                      {/* <hr className="hr__tag mt-0 mb-4" /> */}
                      <h2 className="text-white mb-3">Basic Details</h2>
                      <Col xs={2}>
                        {" "}
                        <SelectComponent
                          register={register}
                          label="Prefix"
                          name="name_prefix"
                          options={[
                            { label: "Mr", name: "mr" },
                            { label: "Mrs", name: "mrs" },
                          ]}
                        />
                      </Col>
                      <Col xs={5}>
                        <TextFieldComponent
                          errorMessage={_.get(errors, "firstName.message", "")}
                          register={register}
                          type={type}
                          placeholder="First Name"
                          name="firstName"
                          label="First Name"
                        />
                      </Col>
                      <Col xs={5}>
                        <TextFieldComponent
                          errorMessage={_.get(errors, "lastName.message", "")}
                          register={register}
                          type={type}
                          placeholder="Last Name"
                          name="lastName"
                          label="Last Name"
                        />
                      </Col>
                    </Row>
                  ) : eachField.type === "select" ? (
                    <SelectComponent
                      label={eachField.label}
                      name={eachField.name}
                      options={eachField.options}
                      register={register}
                    />
                  ) : eachField.type === "image" ? (
                    <ImageUpload file={file} setFile={setFile} hidelabel={false} >
                      <div className="rounded-md shadow-lg" style={{ width: "100%", backgroundColor: "#c5c6c7" }}>
                        <div className="items-center p-4 m-4 text-center border-4 border-dotted w-96 h-96">
                          <p className="self-auto">Drag and drop (Or click to drop) a image file</p>
                        </div>
                      </div>
                      <input
                        name="image"
                        type="text"
                        value={file ? file : ""}
                        className="d-none"
                        {...register("image")}
                      />
                    </ImageUpload>
                  ) : eachField.type === "radio" ? (
                    <RadioComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "date" ? (
                    <DatePickerComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "textArea" ? (
                    <TextAreaComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      placeholder={placeholder}
                      name={name}
                      label={label}
                    />
                  ) : eachField.name === "weight" ? (
                    <Row>
                      <Col>
                        <TextFieldComponent
                          errorMessage={_.get(errors, "height.message", "")}
                          register={register}
                          type={type}
                          placeholder="Height (cms)"
                          name="height"
                          label="Height"
                        />
                      </Col>
                      <Col>
                        <TextFieldComponent
                          register={register}
                          errorMessage={_.get(errors, "weight.message", "")}
                          type={type}
                          placeholder="Weight (kg)"
                          name="weight"
                          label="Weight"
                        />
                      </Col>
                    </Row>
                  ) : (
                    <TextFieldComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      label={label}
                    />
                  )}
                </>
              );
            })}
            <hr className="hr__tag mt-5 mb-4" />
            <Row>
              <h2 className="text-white mb-3">Emergency Contact Details </h2>
            </Row>
            {_.map(emergencyFields, (eachField) => {
              const { type, label, placeholder, name } = eachField;
              return (
                <>
                  {eachField.type === "text" ? (
                    <TextFieldComponent
                      errorMessage={_.get(errors[name], "message", "")}
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      register={register}
                      type={type}
                    />
                  ) : null}
                </>
              );
            })}
            <Button className="w-100 mb-4 mt-2 primary__btn" variant="primary" type="submit">
              {editLoading ? <Spinner animation="border" /> : "Update"}
            </Button>
          </form>
        </div>
     </ModalComponent>
    </div>
  )
}

export default PathologistProfile