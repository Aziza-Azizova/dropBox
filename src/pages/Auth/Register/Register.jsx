import React from 'react'
import RegisterForm from '../../../components/Auth/Register.component'
import { Link } from 'react-router-dom'
import { Navigation } from '../../../components/Home'

const Register = () => {
  return (
    <div>
        <Navigation/>
        <div className="container-fluid">
            <h1 className="display-1 my-5 text-center">Register</h1>
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <RegisterForm/>
                    <p className="text-center my-3">Already a member?
                        <Link to="/login" className="ps-1 ms-auto text-center">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register