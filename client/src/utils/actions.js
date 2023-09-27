import axios from 'axios'
const BASE_URL = 'http://localhost:8000';
const TOKEN = localStorage.getItem("token") // Replace with your Bearer token
// Set headers
const config = {
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
}

export const getPosts = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/post`, config)
    return data
}
export const getUser = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/user/${id}`, config)
    return data
}
export const getDataById = async (path, id = "") => {
    const { data } = await axios.get(`${BASE_URL}${path}/${id}`, config)
    return data
}
export const getData = async (path) => {
    const { data } = await axios.get(`${BASE_URL}${path}`, config)
    return data
}
