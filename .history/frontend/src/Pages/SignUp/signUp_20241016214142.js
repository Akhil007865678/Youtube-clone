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
            <input type='text' className='signUp_Inputs_inp' placeholder='Channel Name'/>
            <input type='text' className='signUp_Inputs_inp' placeholder='User Name'/>
            <input type='password' className='signUp_Inputs_inp' placeholder='Password'/>
            <input type='text' className='signUp_Inputs_inp' placeholder='About Your Channel'/>
            <div className='image_upload_signup'>
                <input type='file'/>
                <div className='image_upload_signup_div'>
                    <img className='image_default_signup' src='https://cdn.pixabay.com/photo/2024/03/19/15/23/boy-8643450_640.png'/>
                    
                </div>
            </div>
            <div className='signUpBtns'>
                <div className=''></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
