import React, { useState } from 'react'
import styles from '../../styles/sign.module.css'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/userAuthentication'
import { toast } from 'react-toastify'
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
      const response = await fetch(`${process.env.BACKEND_ENDPOINT}/user/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json()
      if (await response.ok) {
        handleAuthetication(data)
        localStorage.setItem('authetication', JSON.stringify(data));
        toast.success("User logged in successfully.")
      } else {
        // Handle signup error
        setError(data.error)
        toast.error('Wrong email or password.')
      }
    } catch (error) {
      console.error('Error during signin:', error);
      toast.error('Error signing in')
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