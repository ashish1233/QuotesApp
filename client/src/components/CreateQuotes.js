import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { CREATE_QUOTE } from '../gqloperations/mutations'
import { GET_ALL_QUOTES } from '../gqloperations/queries'

export default function CreateQuotes() {

    const [quote, setQuote] = useState("")
    const [createQuote, {data, loading, error} ]=useMutation(CREATE_QUOTE, {
        refetchQueries:[GET_ALL_QUOTES, 'getAllQuotes', 'getMyProfile',]
    })
    
    const handleSubmit = (e) =>{
       e.preventDefault()
       console.log(quote)
       createQuote({
           variables:{
               name:quote
           }
       })
    }

    if(loading) return <h1>Loading....</h1>
    if(error) {
        console.log(error.message)
    }

    if(data) {
        console.log(data)
    }

    

  return (
    <div className='container my-container' >
        {
            error &&
            <div className='red card-panel'>{error.message}</div>
        }
        {
            data &&  <div className='green card-panel'>{data.quote} </div>
        }
        <h5>Create Quote</h5>
        <form onSubmit={handleSubmit}>
         <input 
         type="text" 
         vlaue={quote}
         onChange={e=>setQuote(e.target.value)}
         placeholder="write Quote"
         />
         <button type="submit" className='btn green'>Create</button>
         </form>
    </div>
  )
}
