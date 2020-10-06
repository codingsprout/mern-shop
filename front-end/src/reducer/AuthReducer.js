import { authConstant } from "../action/Constant"

const initState = { 
    token: null, 
    user: { firstName: '', lastName: '', email: '', picture: ''},
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    messasge: ''
}

export default (state = initState, action) => {

    console.log(action)

    switch(action.type) {
        case authConstant.LOGIN_REQUEST:
            state = { 
                ...state, 
                authenticating: true 
            }
        break

        case authConstant.LOGIN_SUCCESS:
            state = { 
                ...state, 
                user: action.payload.user, 
                token: action.payload.token, 
                authenticate: true,
                authenticating: false 
            }
        break

        case authConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break

        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
        break

        case authConstant.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
        break

        default:
        // do nothing
    }

    return state
}