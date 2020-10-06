import { serviceConstant } from "../action/Constant"

const initState = {
    services: [],
    servicesByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: []
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case serviceConstant.GET_SERVICE_SLUG:
            state = {
                ...state,
                services: action.payload.services,
                servicesByPrice: {
                    ...action.payload.servicesByPrice
                }
            }
        break

        default:
            //do nothing
    }

    return state
}