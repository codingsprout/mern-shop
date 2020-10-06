import axios from '../assist/Axios'
import { serviceConstant } from './Constant'

export const getServicesBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/services/${slug}`)
        console.log(res)
        if(res.status === 200) {
            dispatch({
                type: serviceConstant.GET_SERVICE_SLUG,
                payload: res.data
            })
        } else {
            //type: 
        }
    }
}