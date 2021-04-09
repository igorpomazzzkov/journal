import axios from '../api'

class TeacherService {
    getTeacherByUser() {
        return axios.get("/groups/names").then((response) => {
            return response.data
        })
    }
}


export default new GroupService()