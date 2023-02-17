import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_MY_PROFILE } from '../gqloperations/queries'

export default function Profile() {
    const {loading, error, data}=useQuery(GET_MY_PROFILE)
    const navigate= useNavigate()

    if(!localStorage.getItem("token")){
        navigate("/login")
        return <h1>Unauthorized</h1>
    }
    if(loading) return <h1>Loading....</h1>
    if(error) {
        console.log(error.message)
    }
    console.log(data)

  return (
    <div className='container my-container'>
        <h5>Profile</h5>
        <div className='center-align'>
            <img className='circle' style={{border: "2px solid"}} src={`https://robohash.org/${data.user.firstName}.png?size=200x200`} alt="pic"/>
            <h5>{data.user.firstName} {data.user.lastName}</h5>
            <h6>Email - {data.user.email}</h6>
        </div>
        <h3>Your Quotes</h3>
        {
            data.user.quotes.map((q)=>{
                    return <>
                            <blockquote>
                                <h6>{q.name}</h6>
                            </blockquote>                  
                    </>
            })
        }
    </div>
  )
}
