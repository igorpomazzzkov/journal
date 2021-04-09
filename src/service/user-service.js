import axios from '../api'
import {authHeader} from './auth-header'

class UserService {
    getActiveUser() {
        return axios.get("/users/active", {headers: authHeader()}).then((response) => {
            return response.data
        })
    }
}

export default new UserService()