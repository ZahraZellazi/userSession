import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/SignUp.css';

const SignUp = ({ onSwitch }) => {
    //set kol variable as an empty string and fct setName to update it
  const[name , setName] = useState('');
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const[errors , setErrors] = useState({});


  //formvalid mtaa l'email
  //return true si valide sinon false
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
 //formvalid mtaa el pass
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    return re.test(password);
  };
//handles form submition
const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {}; //empty pour stocker les errs

  if (!validateEmail(email)) {
    newErrors.email = 'Invalid email address';
  }

  if (!validatePassword(password)) {
    newErrors.password = 'Password must be at least 8 characters long, contain at least one special character, and one uppercase letter';
  }
//if signup successful errs msg  disapears so we reset the email name and pass
  if (Object.keys(newErrors).length === 0) {
    console.log('Form submitted', { name, email, password });
    toast.success('Sign up successful!');
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
  } else {
    setErrors(newErrors);
  }
};
return (
  <div className='wrapperU'>
    <div className="containerU">
      <div className='titleU'>Sign Up</div>
      <div className='content'>
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
