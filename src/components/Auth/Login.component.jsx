import React, { useState } from 'react'

import { userSignIn } from '../../redux/createActions/createActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!email || !password){
        alert("Please fill in all fields")
        return;
      }

      dispatch(userSignIn(email, password,setSuccess));
    }

    React.useEffect(() => {
      if(success){
        navigate("/")
      }
    }, [success])

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group my-2">
            <input type="email" value={email} name="email" className="form-control" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div className="form-group my-2">
            <input type="password" value={password} name="password" className="form-control" placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <button type="submit" className="btn btn-primary my-2 form-control">Login</button>
    </form>
  )
}

export default LoginForm