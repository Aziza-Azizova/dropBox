import React from 'react'
import LoginForm from '../../../components/Auth/Login.component'
import { Link } from 'react-router-dom'
import { Navigation } from '../../../components/Home'

const Login = () => {
  return (
    <>
        <Navigation/>
        <div className="container-fluid">
            <h1 className="display-1 my-5 text-center">Login</h1>
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <LoginForm/>
                    <p className="text-center my-3">Not a member?
                        <Link to="/register" className="ps-1 ms-auto text-center">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login