import axios from '../assist/Axios'

export const addService = form => {
    return async dispatch => {
        const res = await axios.post('service/create', form)
        console.log(res)
    }
}