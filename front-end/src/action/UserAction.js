import { userConstant } from "./Constant"
import axios from '../assist/Axios'

export const register = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: userConstant.REGISTER_REQUEST })
        const res = await axios.post('/admin/register', { ...user })

        if(res.status === 201) { 
            const { message } = res.data
            dispatch({ 
                type: userConstant.REGISTER_SUCCESS,
                payload: { message } 
            }) 
        } else  {
            if(res.status === 400) { 
                dispatch({ 
                    type: userConstant.REGISTER_FAILURE, 
                    payload: { error: res.data.error }
                }) 
            }
        }
    }
}