import logo from './logo.svg';
import './App.css';
import Home from './home';
import AllTrains from './AllTrains';
import SingleTrain from './SingleTrain';
import { Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import Nav from './nav';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="App">
   
    <Nav />
   <Routes>
   <Route path="/" element={<Home />}/>
    <Route path='/AllTrain' element={<AllTrains />}/>
    <Route path='/SingleTRain' element={<SingleTrain />}/>
   </Routes>
    </div>
  );
}

export default App;
