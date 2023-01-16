import Navbar from '../../components/NavBar/Navbar';

import './LoginPage.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [successmsg, setSuccessmsg] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setSuccessmsg('Login Success! , Redirecting to home...');

      setEmail('');
      setPassword('');
      setErrormsg('');
      setTimeout(() => {
        setSuccessmsg('');
        navigate('/home');
      },2000);
    })
    .catch((error) => {
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setErrormsg('Fill the details correctly');
      }
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        setErrormsg('User not found');
      }
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        setErrormsg('wrong password');
      }
    })
  };

  return (
    <div>
      <Navbar />
      <div className="login-form-container">
        <form className="login-form">
          <h1>Log In</h1>
          {successmsg && <p className="success-msg">{successmsg}</p>}
          {errormsg && <p className="error-msg">{errormsg}</p>}

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <button className='login-button' onClick={handleLogin}>Log in</button>
          <div className='switch'>
            <span>Don't have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
