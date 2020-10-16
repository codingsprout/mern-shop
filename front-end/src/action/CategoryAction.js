import axios from '../assist/Axios'
import { categoryConstant } from './Constant'

const getAllCategory = () => {
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

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.ADD_CATEGORY_REQUEST })

        try {
            const res = await axios.post('/category/create', form)
            if (res.status === 201) {
                dispatch({
                    type: categoryConstant.ADD_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }  
                })
            } else {
                dispatch ({
                    type: categoryConstant.ADD_CATEGORY_FAILURE,
                    payload: res.data.error
                })
            }
        } catch (err) {
            console.log(err.response)
        }
    }
}

export const UpdateCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST })
        const res = await axios.post('/category/update', form)
        if (res.status === 201) {
            dispatch({ type: categoryConstant.UPDATE_CATEGORY_SUCCESS })
            dispatch(getAllCategory())
        } else {
            const { error } = res.data
            dispatch({
                type: categoryConstant.UPDATE_CATEGORY_FAILURE,
                payload: { error }
            })
        }
    }
}

export const DeleteCategory = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST })
        const res = await axios.post('/category/delete', { payload: { ids } })
        
        if(res.status === 201) {
            dispatch(getAllCategory())
            dispatch({ type: categoryConstant.DELETE_CATEGORY_SUCCESS })
        } else {
            const { error } = res.data
            dispatch({ 
                type: categoryConstant.DELETE_CATEGORY_FAILURE, 
                payload: { error } 
            })
        }
    }
}

export { getAllCategory }