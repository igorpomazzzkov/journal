import { responsiveFontSizes } from '@material-ui/core'
import axios from '../api'
import { authHeader } from './auth-header'

class StudentService {
    getAllStudents() {
        return axios.get('/students', { headers: authHeader() }).then((response) => {
            return response.data
        })
    }

    addStudent(student) {
        console.log(student)
        return axios.post('/students', student, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    deleteByIds(ids) {
        axios.delete('/students', { headers: authHeader(), params: { ids: ids.toString() } })
    }
}

export default new StudentService()