import axios from '../api'
import { authHeader } from './auth-header'

class TeacherService {
    getAllTeachers(){
        return axios.get("/teachers", {headers: authHeader()}).then((response) => {
            return response.data
        })
    }
}


export default new TeacherService()