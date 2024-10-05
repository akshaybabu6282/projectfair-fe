import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonApi"

// Register API
export const registerApi = async (userDetails) => {
    return await commonApi("POST", `${BASE_URL}/user/register`, userDetails, "")
}

// Login API
export const loginApi = async (userDetails) => {
    return await commonApi("POST", `${BASE_URL}/user/login`, userDetails, "")
}

// Add project api
export const addprojectApi = async (projectDetails, reqHeader) => {
    return await commonApi("POST", `${BASE_URL}/project/addproject`, projectDetails, reqHeader)
}

// Get home projects 3 nos api
export const getHomeProject = async () => {
    return await commonApi('GET', `${BASE_URL}/project/homeproject`, "", "")
}

// Get all projects
export const getAllProjectApi = async (reqHeader, searchKey) => {
    //query param syntax
    //path?key=value
    return await commonApi('GET', `${BASE_URL}/project/allproject?search=${searchKey}`, "", reqHeader)
}

// Get user project
export const getUserProjectApi = async (reqHeader) => {
    return await commonApi('GET', `${BASE_URL}/project/userproject`, "", reqHeader)
}

// Update project
export const editUserProjectApi = async (projectId, reqBody, reqHeader) => {
    return await commonApi('PUT', `${BASE_URL}/project/editproject/${projectId}`, reqBody, reqHeader)
}

// Delete project
export const deleteProjectApi = async (projectId, reqHeader) => {
    return await commonApi('DELETE', `${BASE_URL}/project/delete/${projectId}`, {}, reqHeader)
}