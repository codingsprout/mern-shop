import { userConstant } from "../action/Constant"

const initState = {
    error: '',
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch(action.type) {
        case userConstant.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break

        case userConstant.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
        break;

        case userConstant.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break

        default:
        // do nothing
    }

    return state
}