import axios from "axios"

const api_url = "https://doctor-patient-project.herokuapp.com/api"


export const patientLogin = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/patient/PatientLogin`,
        data: data
    }).then(res => res)
}

export const patientRegister = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/patient/addPatient`,
        data: data
    }).then(res => res)
}