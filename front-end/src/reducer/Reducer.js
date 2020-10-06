import authReducer from './AuthReducer'
import userReducer from './UserReducer'
import CategoryReducer from './CategoryReducer'
import OrderReducer from './OrderReducer'
import ServiceReducer from './ServiceReducer'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({  
    auth: authReducer, 
    user: userReducer,
    category: CategoryReducer,
    service: ServiceReducer,
    order: OrderReducer
})

export default rootReducer