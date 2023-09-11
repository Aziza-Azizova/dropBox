import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home/home'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'

import { useDispatch } from 'react-redux'
import { isLoggedIn } from './redux/createActions/createActions'

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(isLoggedIn())
  }, [])
  return (
    <div className='App'>
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
