import axios from '../api'
import {authHeader} from './auth-header'

class JournalService {
    getJournalsByTeacherId(teacherId) {
        const params = {
            teacherId: teacherId
        }
        return axios.get("/journals", {
            headers: authHeader(),
            params: params
        }).then((response) => {
            
            return response.data
        })
    }
}


export default new JournalService()