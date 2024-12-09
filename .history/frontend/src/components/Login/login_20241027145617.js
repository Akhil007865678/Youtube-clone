import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField, [name]: event.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', loginField); // Adjust URL as needed
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token if needed
        navigate('/dashboard'); // Redirect to a protected page on success
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className='login'>
      <div className='login_card'>
        <div className='titleCard_login'>
           <YouTubeIcon sx={{ fontSize: "54px", color: "red" }}/>
           Login
        </div>
        <div className='loginCredentials'>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' value={loginField.userName} onChange={(e) => handleOnChangeInput(e, "userName")} placeholder='UserName' type='text'/>
            </div>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' value={loginField.password} onChange={(e) => handleOnChangeInput(e, "password")} placeholder='Password' type='password'/>
            </div>
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className='login_buttons'>
            <div className='login-btn' onClick={handleLogin}> Login </div>
            <Link to={'/signup'} onClick={() => setLoginModal()} className='login-btn'> SignUp </Link>
            <div className='login-btn' onClick={() => setLoginModal()}> Cancel </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
