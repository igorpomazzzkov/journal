import axios from "axios";

export default axios.create({
    baseURL: 'https://journalbackend.herokuapp.com'
})