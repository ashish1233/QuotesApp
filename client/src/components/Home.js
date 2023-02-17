import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_QUOTES } from '../gqloperations/queries'

export default function Home() {

    const {loading, error, data} = useQuery(GET_ALL_QUOTES, {
        fetchPolicy:"cache-and-network"
    })


    if(loading) return <h1>Loading....</h1>
    if(error) {
        console.log(error.message)
    }

  return (
    <div  className='container my-container'>
         <h5>List of Quotes</h5>
        {
            data.quotes.map((quote, i)=>{
                return (
                    <blockquote key={i}>
                    <h6>{quote.name}</h6>
                    <Link to={`/profile/${quote.by._id}`}><p className='right-align'>{quote.by.firstName}</p></Link>
                    </blockquote>
                )
            })
        }
       
        

    </div>
  )
}
