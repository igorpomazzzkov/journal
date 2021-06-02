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

    getAllJournals() {
        return axios.get('/journals', {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    getJournalInfo(id) {
        return axios.get('/journals/' + id, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    getJournalById(id) {
        return axios.get('/journals/', {headers: authHeader(), params: {journalId: id}}).then((response) => {
            return response.data
        })
    }

    addJournal(journal) {
        return axios.post('/journals', journal, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    deleteByIds(ids) {
        axios.delete('/journals', {headers: authHeader(), params: {ids: ids.toString()}})
    }

    addJournalInfo(id, data) {
        return axios.post('/journals/' + id, data, {
            headers: authHeader()
        }).then((response) => {
            return response.data
        })
    }

    getHeader(id) {
        return axios.get('/journals/' + id + '/header', {
            headers: authHeader()
        }).then((response) => {
            return response.data
        })
    }

    getCell(id, groupId) {
        return axios.get('/journals/' + id + '/cell', {
            headers: authHeader(),
            params: {groupId: groupId}
        }).then((response) => {
            return response.data
        })
    }
}

export default new JournalService()