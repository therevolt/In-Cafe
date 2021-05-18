import {combineReducers} from 'redux'
import User from './users'
import Key from './key'
const RootReducer = combineReducers({
    user : User,
    key : Key
})
export default RootReducer