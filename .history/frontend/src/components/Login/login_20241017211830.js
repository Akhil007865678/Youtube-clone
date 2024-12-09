import React, {useState} from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './login.css';
import { Link } from 'react-router-dom';

const Login = ({setLoginModal}) => {
  const [logniField,setLoginField] = useState({"userName":"","password":""});
  console.log(logniField)
  const handleOnChangeInput = (event, name) => {
    setLoginField({
      
    })
  }
  return (
    <div className='login'>
      <div className='login_card'>
        <div className='titleCard_login'>
           <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
           Login
        </div>
        <div className='loginCredentials'>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' value={logniField.userName} onChange={()=>handleOnChangeInput(e,"userName")} placeholder='UserName' type='text'/>
            </div>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' value={logniField.password} onChange={()=>handleOnChangeInput(e,"password")} placeholder='Password' type='password'/>
            </div>
        </div>
        <div className='login_buttons'>
            <div className='login-btn'> Login </div>
            <Link to={'/signup'} onClick={() => setLoginModal()} className='login-btn'> SignUp </Link>
            <div className='login-btn' onClick={() => setLoginModal()}> Cancel </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
