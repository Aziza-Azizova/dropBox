import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { userSignOut } from '../../redux/createActions/createActions'

export const Home = () => {
  const {isAuthenticated, user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <div className="row min-vh-100">
      <div className="my-auto">    
          {
            isAuthenticated ? (
              <>
              <div className="text-center display-5 fw-bold">Welcome,
                <span className="fw-bold">{user.displayName}</span>
              </div>
               <div className="d-flex mt-3 justify-content-center">
                <div className="mx-2">
                  <Link className="btn btn-outline-dark" to="/dashboard">Dashboard</Link>
                </div>
                <div className="mx-2">
                    <Link className="btn btn-outline-dark" to="/" onClick={() => dispatch(userSignOut())}>Logout</Link>
                </div>
                </div>
              </>
            )
            :
            (
              <>
              <div className="text-center display-5 fw-bold">Welcome to Drop Box Project!</div>
              <div className="d-flex mt-3 justify-content-center">
                <div className="mx-2">
                  <Link className="btn btn-outline-dark" to="/login">Login</Link>
                </div>
                <div className="">
                    <Link className="btn btn-outline-dark" to="/register">Register</Link>
                </div>
                </div>
              </>
            )
          }
      </div>
    </div>
  )
}
