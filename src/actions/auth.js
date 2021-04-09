import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SET_MESSAGE} from '../actions/types'
import AuthService from '../service/auth-service'

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then((data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {user: data}
        })
        return Promise.resolve()
    }, (error) => {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type: SET_MESSAGE,
            payload: message
        })
        return Promise.reject()
    })
}

export const logout = () => (dispatch) => {
    AuthService.logout()
    dispatch({
        type: LOGOUT
    })
}
