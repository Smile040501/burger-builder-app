import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_PROJECT_BASE_URL,
});
