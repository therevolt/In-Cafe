import {combineReducers} from 'redux'
import User from './users'
const RootReducer = combineReducers({
    user : User
})
export default RootReducer