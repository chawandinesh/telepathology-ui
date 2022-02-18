import axios from "axios"

export const api_url = "https://doctor-patient-project.herokuapp.com/api"
export const baseUrl = "https://doctor-patient-project.herokuapp.com"
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

export const pathologistLogin = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/pathologist/pathologistLogin`,
        data: data
    }).then(res => res)
}

export const pathologistRegister = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/pathologist/addPathologist`,
        data: data
    }).then(res => res)
}


export const addReportFile = async(data) => {
    return axios({
        method:"POST",
        url:`${api_url}/patient/addreportFile`,
        data: data
    }).then(res => res)
}

export const updatePatient = async(data) => {
    return axios({
        method:"PUT",
        url:`${api_url}/patient/updatePatient`,
        data: data
    }).then(res => res)
}

export const getPatientById = async(id) => {
    return axios({
        method: "GET",
        url: `${api_url}/patient/getPatientById/${id}`,
    }).then(res => res)
}

export const getPathologistById = async(id) => {
    return axios({
        method: "GET",
        url: `${api_url}/pathologist/getPathologistById/${id}`,
    }).then(res => res)
}

export const getAllPatients = async() => {
    return axios({
        method: "GET",
        url: `${api_url}/patient/getPatients`
    })
}

export const getAllPathologists = async() => {
    return axios({
        method: "GET",
        url: `${api_url}/pathologist/getPathologists`
    })
}

export const addService = (data) => {
    return axios({
        method: "POST",
        url: `${api_url}/service/addService`,
        data: data
    })
}

export const getPatientServiceById = async(id, status) => {
    return await axios({
        method: "GET",
        url: `${api_url}/service/getPatientService?id=${id}&status=${status}`
    })
}

export const getPathologistServiceById = async(id, status) => {
    return await axios({
        method: "GET",
        url: `${api_url}/service/getPathologistService?id=${id}&status=${status}`
    })
}

export const updateServiceById = async(data) => {
    return await axios({
        method: "PUT",
        url: `${api_url}/service/updateServiceById`,
        data: data
    })
}