import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../config/config';
import { collection, addDoc } from 'firebase/firestore';

import Navbar from '../../components/NavBar/Navbar';

import './RegisterPage.css';
import { Toast } from 'react-bootstrap';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const [errormsg, setErrormsg] = useState('');
  const [successmsg, setSuccessmsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;

        addDoc(collection(database, 'users'), {
          name: name,
          email: email,
          password: password,
          number: number,
          cart: initialcartvalue,
          address: address,
          uid: user.uid,
        })
          .then(() => {
            setSuccessmsg('New User Registered Successfully');
            setName('');
            setEmail('');
            setPassword('');
            setNumber('');
            setAddress('');
            setErrormsg('');
            setTimeout(() => {
              setSuccessmsg('');
              navigate('/login');
            }, 2000);
          })
          .catch((err) => {
            setErrormsg(err.message);
          });
      })
      .catch((err) => {
        if (err.message === 'Firebase: Error (auth/invalid-email).') {
          setErrormsg('Fill the details correctly');
        }
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          setErrormsg('User already registered');
        }
      });
  };
  return (
    <div className="register-page-container">
      <Navbar />
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          {successmsg && <Toast className="success-msg">{successmsg}</Toast>}
          {errormsg && <Toast className="error-msg">{errormsg}</Toast>}

          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />

          <input
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            name="number"
            id="number"
            placeholder="Phone Number"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <textarea
            onChange={(e) => setAddress(e.target.value)}
            type="address"
            name="address"
            id="address"
            placeholder="address"
          />
          <button type="submit" className="register-button">
            Sign up
          </button>
          <div className="switch">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
