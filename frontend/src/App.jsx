import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prev => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn onSwitch={toggleForm} isSignIn={isSignIn} />} />
        <Route path="/signup" element={<SignUp onSwitch={toggleForm} isSignIn={!isSignIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
