import { responsiveFontSizes } from '@material-ui/core'
import axios from '../api'
import { authHeader } from './auth-header'

class SubjectService {
    getAllSubjects() {
        return axios.get("/subjects", { headers: authHeader() }).then((response) => {
            return response.data
        })
    }

    addSubject(subject) {
        return axios.post('subjects', subject, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    deleteSubjects(ids){
        axios.delete('subjects', {headers: authHeader(), params: {ids: ids.toString()}})
    }
}

export default new SubjectService()