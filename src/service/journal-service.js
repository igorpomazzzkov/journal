import axios from '../api'

class JournalService {
    getJournalsByTeacherId() {
        let teacherId = JSON.parse(localStorage.getItem('user')).id
        return axios.get("/journals", {teacherId}).then((response) => {
            return response.data
        })
    }
}


export default new JournalService()