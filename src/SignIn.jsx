import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/SignIn.css';

const SignIn = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    return re.test(password);
  };

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
      console.log('Form submitted', { email, password });
      toast.success('Sign up successful!');
      setEmail('');
      setPassword('');
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="wrapperI">
      <div className="containerII">
        <div className="titleII">Hello New Friend!</div>
        <p className='paragII'>
          Don't have an account? <br />
          Create an account with your personal info <br />
          click below!
        </p>
        <button className="buttonII" onClick={onSwitch}>Sign Up</button>
      </div>
      <div className="containerI">
        <div className='titleI'>Sign In</div>
        <div className="social-containerI">
          <a href="*" className="socialI facebook"><FaFacebook /></a>
          <a href="*" className="socialI google"><FaGoogle /></a>
          <a href="*" className="socialI linkedin"><FaLinkedin /></a>
        </div>
        <div className="form-containerI">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              className={`inputI ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            <input
              type="password"
              placeholder="Password"
              className={`inputI ${errors.password ? 'error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
            <br />
            <a href="/forgot-password" className="link">Forgot Password?</a>
            <button className="buttonI" type="submit">Sign In</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
