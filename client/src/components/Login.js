import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../gqloperations/mutations'


export default function Login () {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const[signinUser, {data, loading, error} ]=useMutation(LOGIN_USER)

    const handleSubmit = (e) =>{
            e.preventDefault()
            console.log(formData)
            signinUser({
                variables:{
                    userSignin: formData
                }
            })
    }

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if(loading) return <h1>Loading....</h1>
    if(data){
        localStorage.setItem("token", data.user.token)
        navigate("/")
    }

  return (
    <div className='container my-container'>
        {
            error &&
            <div className='red card-panel'>{error.message}</div>
        }
        <h5>Login</h5>
        <form onSubmit={handleSubmit}>
            <input 
            type = "email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            required
            />
             <input 
            type = "password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            required
            />
            <Link to="/signup"><p>Don't have an account ? </p></Link>
            <button type="submit" className='btn 673ab7 deep-purple'>Login</button>
        </form>
    </div>
  )
}
