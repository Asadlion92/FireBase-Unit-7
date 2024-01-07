import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Auth.css'
import { auth } from './../../config/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';


function Auth() {
    //activate useNavigate
    const navigate = useNavigate()

    //create state to determine which form to use
    const [existingUser, setExistingUser] = useState(false)
    //create state for user inputs
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    //create a function for signup
    const handleSignup = (e) => {
        e.preventDefault();
        console.log('signup complete.')
        //create a user with firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res.user)
            //add name as displayName
            updateProfile(auth.currentUser, 
            {displayName: name})

            //redirect to homepage
            navigate('/')

        })
        .catch(err => console.log(err))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        //call function to log in
        signInWithEmailAndPassword(auth, email, password)
        .then(res=>{
            //go to homepage
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            alert(err)
        })
    }

  return (
    <div className='auth-container'>
        {
            existingUser?
            <form className='auth-form' onSubmit={handleLogin}>
                <h1>Login with your email</h1>
                <div className="form-group">
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required/>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required/>
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <span className="form-link" onClick={()=>setExistingUser(false)}>Signup</span></p>
            </form>
            :
            <form className='auth-form' onSubmit={handleSignup}>
                <h1>Signup with your email</h1>
                <div className="form-group">
                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" required/>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required/>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required/>
                    
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <span className="form-link" onClick={()=>setExistingUser(true)} >Login</span></p>
            </form>
        }
    </div>
  )
}

export default Auth