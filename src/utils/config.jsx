import axios from "axios";

const defaultOptions = {
    baseURL: "https://opentdb.com/",
    headers: {
        'Content-Type': 'application/json',
    },
};

let API = axios.create(defaultOptions);

export default API;

