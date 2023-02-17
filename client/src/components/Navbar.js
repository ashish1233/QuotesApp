import { useApolloClient } from '@apollo/client'
import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar() {
   

    const token = localStorage.getItem("token")
    
    const navigate = useNavigate()


    
   const client = useApolloClient();
//   const refetchCurrentUser = useContext(CurrentUserContext);

    const handleLogout= () =>{
        localStorage.removeItem("token")
       // client.clearStore()
       client.clearStore().then(()=>{
        client.resetStore();
        navigate('/login')
       })
    }


  return (
    <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo left">Quote APP</Link>
      <ul id="nav-mobile" className="right">
          {
              token ?
              <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/create">Create</Link></li>
              <li><button onClick={handleLogout} className='red btn'>Logout</button></li>
              </> : 
              <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              </>
          } 
      </ul>
    </div>
  </nav>
  )
}
