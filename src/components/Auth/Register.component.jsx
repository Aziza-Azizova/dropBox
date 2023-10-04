import React, { useState } from 'react'
import { userSignUp } from '../../redux/createActions/createActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !password || !confirmPassword){
          toast.error("Please fill in all fields")
          return;
        }

        if(password !== confirmPassword){
            toast.error("Password do not match")
            return;
        }
        if(password.length < 6){
            toast.error("Password should be at least 6 characters ")
        }
  
        dispatch(userSignUp(name, email, password, setSuccess));
    }

    React.useEffect(() => {
        if(success){
            navigate("/")
        }
    }, [success])

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <input type="text" value={name} name="name" className="form-control" placeholder="Enter your name" onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="form-group my-2">
                <input type="email" value={email} name="email" className="form-control" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div className="form-group my-2">
                <input type="password" value={password} name="password" className="form-control" placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <div className="form-group my-2">
                <input type="password" value={confirmPassword} name="confirmPassword" className="form-control" placeholder="Confirm your password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
        </form>
    )
}

export default RegisterForm