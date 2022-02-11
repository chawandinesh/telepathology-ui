import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { baseUrl, getPathologistById, getPatientById, getUserData } from '../../helpers/helpers'
import '../patient/uploadpathology/uploadpathology.css'
import userImage from '../../assets/images/user.png'

const PathologistProfile = () => {
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
  
  return (
    <div className="upload__pathology__container">
    <div className="dashboard__main__header">
      <h3>Profile</h3>
    </div>
     <div className='user__container' style={{width: "100%", display:'flex', justifyContent:'center'}}>
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
     </div>
    </div>
  )
}

export default PathologistProfile