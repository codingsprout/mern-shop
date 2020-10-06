import CategoryReducer from './CategoryReducer'
import { combineReducers } from 'redux'
import ServiceReducer from './ServiceReducer'

const rootReducer = combineReducers({ 
    category: CategoryReducer,
    service: ServiceReducer 
})

export default rootReducer