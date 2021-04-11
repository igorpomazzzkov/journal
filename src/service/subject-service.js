import axios from '../api'
import {authHeader} from './auth-header'

class SubjectService {
    getAllSubjects() {
        return axios.get("/subjects", {headers: authHeader()}).then((response) => {
            return response.data
        })
    }
}


export default new SubjectService()