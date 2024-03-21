import React, { useState } from 'react'
import styles from '../Signup/sign.module.css'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/userAuthentication'
function Signin() {
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const {handleAuthetication}=useAuthValue()
  const [error,setError]=useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearError = ()=>{
    setError(null)
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/user/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json()
      if (await response.ok) {
        handleAuthetication({userId:data.userId,token:data.token,email:data.email,username:data.username,avatar:data.avatar,contact_no:data.contact_no})
        localStorage.setItem('authetication', JSON.stringify({userId:data.userId,username:data.username,token:data.token,email:data.email,username:data.username,avatar:data.avatar}));

      } else {
        // Handle signup error
        setError(data.error)
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  }
  return (
	
	<div className={styles.signContainer}>
    <h1>Sign in</h1>
		<form onSubmit={handleSubmit}>
			<input type="email" placeholder="Email" name="email" onFocus={clearError} onChange={handleChange} required/>
			<input type="password" placeholder="Password" name="password" onFocus={clearError} onChange={handleChange} required />
			{error&&<p className={styles.error}>{error}</p>}
			<button type="submit">Sign In</button>
		</form>
    <p>New User? <Link to="/sign-up">Create Account</Link></p>

</div>

  )
}

export default Signin