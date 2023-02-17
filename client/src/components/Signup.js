import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../gqloperations/mutations'



export default function Signup() {

    const [formData, setFormData] = useState({})
    const [signupUser, {data, loading, error}]= useMutation(SIGNUP_USER)

    const handleSubmit = (e) =>{
            e.preventDefault()
            console.log(formData)
            signupUser({
                variables:{
                    userNew: formData
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
    if(error) {
        console.log(error.message)
    }

  return (
    <div className='container my-container'>
        {
            error &&
            <div className='red card-panel'>{error.message}</div>
        }
        {
            data && data.user && <div className='green card-panel'>{data.user.firstName} is SignedUp. You can login Now</div>
        }
        <h5>Signup</h5>
        <form onSubmit={handleSubmit}>
        <input 
            type = "text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
            />
            <input 
            type = "text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            required
            />
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
            <Link to="/login"><p>Already have an account ? </p></Link>
            <button type="submit" className='btn 673ab7 deep-purple'>Submit</button>
        </form>
    </div>
  )
}
