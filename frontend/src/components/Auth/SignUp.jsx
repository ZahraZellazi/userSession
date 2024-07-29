import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const SignUp = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validate email address
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate password
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    return re.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {}; // empty object to store errors

    // Validate input fields
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 8 characters long, contain at least one special character, and one uppercase letter';

    // If there are no errors, proceed to send data to the backend
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:6500/auth/signup', { name, email, password });

        if (response.status === 201) {
          toast.success('Sign up successful!');
          setName('');
          setEmail('');
          setPassword('');
          setErrors({});
        } else {
          toast.error(response.data.error || 'Sign up failed');
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error('Sign up error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='wrapperU'>
      <div className="containerU">
        <div className='titleU'>Sign Up</div>
        <div className='content'>
          {/* You can add additional content here if needed */}
        </div>
        <div className="social-containerU">
          <a href="*" className="socialU facebook"><FaFacebook /></a>
          <a href="*" className="socialU google"><FaGoogle /></a>
          <a href="*" className="socialU linkedin"><FaLinkedin /></a>
        </div>
        <div className="form-containerU">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className={`inputU ${errors.name ? 'error' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
            
            <input
              type="text"
              placeholder="E-mail"
              className={`inputU ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            
            <input
              type="password"
              placeholder="Password"
              className={`inputU ${errors.password ? 'error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
            
            <a href="/forgot-password" className="link">Forgot Password?</a>
            <button className="buttonU" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <div className="containerUU">
        <div className="titleUU">Welcome Back!</div>
        <p className='paragUU'>Already have an account, <br />Login with your personal info.</p>
        <button className="buttonUU" onClick={onSwitch}>Sign In</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
