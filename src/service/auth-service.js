import axios from '../api'

class AuthService {
    login(username, password) {
        return axios
            .post('/auth/login', { username, password })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("credentials", JSON.stringify(response.data))
                }
                return response.data
            })
    }

    logout() {
        const token = JSON.parse(localStorage.getItem("credentials")).token
        return axios
            .post('/auth/logout', { "token": token })
            .then((response) => {
                if (response.status === 204) {
                    localStorage.removeItem("credentials")
                    return true
                }
                return false
            })
    }

    register() {
    }
}

export default new AuthService()