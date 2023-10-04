import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css'
import { Home } from './pages/Home/home'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'

import { useDispatch } from 'react-redux'
import { isLoggedIn } from './redux/createActions/createActions'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    dispatch(isLoggedIn(setLoading))
  }, [])

  if(loading) return null;

  return (
    <div className='App'>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard/*" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
