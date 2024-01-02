import './App.css';
import BatchTransaction from './components/BatchTransaction';
import Login from './components/Login'
import Register from './components/Register'
import Wallettransaction from './components/Wallettransaction';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
   <>
      <Router>
        <div className="App">

          <Routes>
            <Route key="Login" path='/login' exact element={<Login></Login>} />
            <Route key="register" path='/' exact element={<Register></Register>}></Route>
            <Route key="wallet" path='/wallet' exact element={<Wallettransaction></Wallettransaction>}></Route>
            <Route key="batch" path='/batch' exact element={<BatchTransaction></BatchTransaction>}></Route>
          </Routes>
        </div> 
      </Router>
    </>
  );
}

export default App;