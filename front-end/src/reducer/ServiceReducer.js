import { serviceConstant } from "../action/Constant";

const initialState = {
    services: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case serviceConstant.GET_SERVICE_SUCCESS:
            state = {
                ...state,
                services: action.payload.services
            }
        break
    }

    return state
}