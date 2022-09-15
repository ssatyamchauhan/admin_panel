import axios from "axios";
import { Constants } from "../flux";
import { clearLocalStorage, getFingerPrint, getFromLocalStorage, removeFromLocalStorage } from "./helper";

const api = "https://pronewsapi.tracenow.co.in/api"; //"http://localhost:6001/api"; //  

const getUrl = (endpoint) => api + endpoint;

axios.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
        removeFromLocalStorage("token")
        clearLocalStorage(Constants.IS_AUTHENTICATED);
        window.location.href = "/"
    }
    return error;
});

export const GET_REQUEST = async (endpoint) => {
    return axios.request({
        url: getUrl(endpoint),
        method: "GET",
        headers: {
            'x-api-key': 'oiw8328osdmfr712wwqwe'
            // fp: await getFingerPrint()
        }
    })
}

export const DELETE_REQUEST = async (endpoint, body) => {
    return axios.request({
        url: getUrl(endpoint),
        method: "DELETE",
        headers: {
            'x-api-key': 'oiw8328osdmfr712wwqwe'
            // fp: await getFingerPrint()
        },
        data: body
    })
}

export const POST_REQUEST = async (endpoint, body) => {
    return axios.request({
        url: getUrl(endpoint),
        method: "POST",
        headers: {
            'x-api-key': 'oiw8328osdmfr712wwqwe'
            // fp: await getFingerPrint()
        },
        data: body
    })
}

export const PATCH_REQUEST = async (endpoint, body) => {
    return axios.request({
        url: getUrl(endpoint),
        method: "PATCH",
        headers: {
            'x-api-key': 'oiw8328osdmfr712wwqwe'
            // fp: await getFingerPrint()
        },
        data: body
    })
}

export const loginWithPassword = async (endpoint, body) => {
    return axios.request({
        url: getUrl(endpoint),
        method: "POST",
        headers: {
            // fp: await getFingerPrint()
        },
        data: body
    })
}

export const PUT_REQUEST = async (endpoint, body) => {
    return axios.request({
        method: "PUT",
        url: getUrl(endpoint),
        headers: {
            'x-api-key': 'oiw8328osdmfr712wwqwe'
            // fp: await getFingerPrint()
        },
        data: body
    })
}