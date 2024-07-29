import { useState } from 'react';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prev => !prev);
  };

  return (
    <div>
      {isSignIn ? (
        <SignIn onSwitch={toggleForm} />
      ) : (
        <SignUp onSwitch={toggleForm} />
      )}
    </div>
  );
}

export default App;
