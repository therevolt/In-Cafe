import {combineReducers} from 'redux'
import User from './users'
import Key from './key'
import Chart from './chart'
const RootReducer = combineReducers({
    user : User,
    key : Key,
    chart : Chart
})
export default RootReducer