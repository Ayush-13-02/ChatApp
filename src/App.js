import logo from './logo.svg';
import './App.css';
import Login from './Page/Login';
import Register from './Page/Register';
import Home from './Page/Home';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
function App() {
  const {currentuser} =  useContext(AuthContext)
  const ProtectedRoute = ({children})=>{
    if(!currentuser) return <Navigate to="/Login" />;
    
    return children;
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }></Route>
      <Route exact path='/Login' element={<Login/>}></Route>
      <Route exact path='/Register' element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
