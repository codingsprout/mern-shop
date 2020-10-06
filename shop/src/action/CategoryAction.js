import axios from '../assist/Axios'
import { categoryConstant } from './Constant'

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstant.GET_CATEGORY_REQUEST })

        const res = await axios.get('category/get')
        console.log(res)

        if (res.status === 200) {

            const { categoryList } = res.data

            dispatch({
                type: categoryConstant.GET_CATEGORY_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryConstant.GET_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}