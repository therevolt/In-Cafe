import Routers from './configs/routers'
import './App.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import store from './configs/redux'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store}>
        <Routers/>
    </Provider>
  )
}

export default App;
