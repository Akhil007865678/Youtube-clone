import React from 'react'
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';

const SignUp = () => {
  return (
    <div className='signup'>
      <div className='signup_card'>
        <div className='signUp_title'>
           <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
           SignUp
        </div>
        <div className='signUp_Inputs'>
            <input type='text' className='signUp_Inputs_inp' placeholder=''
        </div>
      </div>
    </div>
  )
}

export default SignUp;
