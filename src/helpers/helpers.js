import axios from "axios"

export const api_url = "https://doctor-patient-project.herokuapp.com/api"
export const image_url = "https://doctor-patient-project.herokuapp.com"
export const isLoginSuccess = () => {
    const token = window.localStorage.getItem("token")
    return Boolean(token)
}

export const getUserData = () => {
    const data = window.localStorage.getItem("user")
    return JSON.parse(data)
}

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

export const addReportFile = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/patient/addReportFile`,
        data: data
    }).then(res => res)
}

export const updatePatient = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/patient/updatePatient`,
        data: data
    }).then(res => res)
}
