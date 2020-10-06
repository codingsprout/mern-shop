import axios from "../assist/Axios"
import { categoryConstant, serviceConstant } from "./Constant"

export const getStartingData = () => {
    return async dispatch => {

        const res = await axios.post('/startingData')
        if(res.status === 200) {

            const { categories, services } = res.data
            dispatch({
                type: categoryConstant.GET_CATEGORY_SUCCESS,
                payload: { categories }
            })

            dispatch({ 
                type: serviceConstant.GET_SERVICE_SUCCESS,
                payload: { services }
            })
        } console.log(res)
    }
}