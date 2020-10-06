import { authConstant } from "./Constant"
import axios from '../assist/Axios'

export const login = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: authConstant.LOGIN_REQUEST })
        const res = await axios.post('/admin/login', { ...user })

        if(res.status === 200) { 
            const { token, user } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({ 
                type: authConstant.LOGIN_SUCCESS, 
                payload: { token, user } 
            }) 
        } else  {
            if(res.status === 400) { 
                dispatch({ 
                    type: authConstant.LOGIN_FAILURE, 
                    payload: { error: res.data.error }
                }) 
            }
        }
    }
}

export const userLoggedIn = () => {

    return async dispatch => { 
        const token = localStorage.getItem('token')
        if(token) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({ 
                type: authConstant.LOGIN_SUCCESS, 
                payload: { token, user } 
            })
        } else {
            dispatch({ 
                type: authConstant.LOGIN_FAILURE, 
                payload: { error: 'Failed to log in' }
            }) 
        }
    }
}

export const logout = () => {
    return async dispatch => {

        dispatch({ type: authConstant.LOGOUT_REQUEST })
        const res = await axios.post('/admin/logout')

        if(res.status === 200) {
            localStorage.clear()
            dispatch({ 
                type: authConstant.LOGOUT_SUCCESS
            })
        } else {
            dispatch({ 
                type: authConstant.LOGOUT_FAILURE, 
                payload: {error: res.data.error } 
            })
        }
    }
}