import {combineReducers} from 'redux'
import User from './users'
import Key from './key'
<<<<<<< HEAD
const RootReducer = combineReducers({
    user : User,
    key : Key
=======
import Chart from './chart'
const RootReducer = combineReducers({
    user : User,
    key : Key,
    chart : Chart
>>>>>>> 7cf0668ab8c550fdfddd5f629fb88cff0cf23483
})
export default RootReducer