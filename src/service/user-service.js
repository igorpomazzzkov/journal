import axios from '../api'
import {authHeader} from './auth-header'

class UserService {
    getActiveUser() {
        return axios.get("/users/active", {headers: authHeader()}).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
        }, (error) => {
            return error.response
        })
    }
}

export default new UserService()