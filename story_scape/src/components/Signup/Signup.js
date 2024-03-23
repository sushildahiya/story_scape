import React, {  useState } from 'react'
import styles from '../../styles/sign.module.css'
import { useAuthValue } from '../../context/userAuthentication';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Signup() {
  const{handleAuthetication} = useAuthValue()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact_no: '',
    password: '',
    confirm_password: ''
  });
  const [error,setError]=useState(null)
  
  /**
   * Check email unqiness while creating a user
   */
  const handleEmailUnqiness = async ()=>{
    const response = await fetch('http://localhost:8000/user//unqiue-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:formData.email})
    }); 
    const data = await response.json()
    if(! await response.ok){
      setError(data.error)
      toast.error("Validation Error")
    }
  }

  /**
   * Method to clear validation error 
   */
  const clearError = ()=>{
    setError(null)
  }

  /**
   * Method to handle form input field changes
   * @param {*} e 
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission
   * @param {*} e 
   */
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/create-user', {
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
        toast.success('User created successfully.')
        navigate('/user-avatar')

      } else {
        // Handle signup error of data validations
        setError(data.error)
        toast.error("Validation error")
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error("Error creating the user.")
    }
  }
  return (  
    <div className={styles.signContainer}>
      <h1>Create Account</h1>
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Name" name="username" value={formData.username} onFocus={clearError}
          onChange={handleChange}/>
			<input type="email" placeholder="Email" name="email"  value={formData.email} onFocus={clearError} onBlur={handleEmailUnqiness}
          onChange={handleChange}/>
            <input type="text" placeholder="Contact No." name="contact_no"  value={formData.contact_no} onFocus={clearError}
          onChange={handleChange}/>
			<input type="password" placeholder="Password" name="password"  value={formData.password} onFocus={clearError}
          onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" name="confirm_password" onFocus={clearError} value={formData.confirm_password}
          onChange={handleChange}/>
      {error&&<p className={styles.error}>{error}</p>}
			<button type="submit">Sign Up</button>

		</form>
    <p>Already have an account <Link to="/sign-in">Login</Link></p>
	</div>
  )
}


export default Signup