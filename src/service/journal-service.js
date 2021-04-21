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

    getAllJournals(){
        return axios.get('/journals', {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    getJournalInfo(id){
        return axios.get('/journals/' + id, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    getJournalById(id){
        return axios.get('/journals/', {headers: authHeader(), params: {journalId: id}}).then((response) => {
            return response.data
        })
    }

    addJournal(journal){
        return axios.post('/journals', journal, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    deleteByIds(ids) {
        console.log(ids)
        axios.delete('/journals', { headers: authHeader(), params: { ids: ids.toString() } })
    }
}


export default new JournalService()