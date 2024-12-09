import React,{useState} from 'react'
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpField, setSignUpField] = useState({"channelName":"","userName":"","password":"","about":"","profilePic":""});
  const [uploadImageUrl,setUploadImageUrl] = useState("https://cdn.pixabay.com/photo/2024/03/19/15/23/boy-8643450_640.png");
  const [progressBar, setProgressBar] = useState(false);
  const handleInputField = (event,name) => {
    setSignUpField({
      ...signUpField,[name]:event.target.value
    })
  }

  const handleSignUp = async()=>{
    setProgressBar(true);
    axios.post('http://localhost:4000/auth/signup',signUpField).then((res)=>{
      toast.success(res.data.message)
      navigate
      setProgressBar(false);
    }).catch(err =>{
      setProgressBar(false);
      toast.error(err);
    })
  }
  
  console.log(signUpField)
  return (
    <div className='signup'>
      <div className='signup_card'>
        <div className='signUp_title'>
           <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
           SignUp
        </div>
        <div className='signUp_Inputs'>
            <input type='text' className='signUp_Inputs_inp' value={signUpField.channelName} onChange={(e)=>{handleInputField(e,"channelName")}} placeholder='Channel Name'/>
            <input type='text' className='signUp_Inputs_inp' value={signUpField.userName} onChange={(e)=>{handleInputField(e,"userName")}} placeholder='User Name'/>
            <input type='password' className='signUp_Inputs_inp' value={signUpField.password} onChange={(e)=>{handleInputField(e,"password")}} placeholder='Password'/>
            <input type='text' className='signUp_Inputs_inp' value={signUpField.about} onChange={(e)=>{handleInputField(e,"about")}} placeholder='About Your Channel'/>
            <div className='image_upload_signup'>
                <input type='file'/>
                <div className='image_upload_signup_div'>
                    <img className='image_default_signup' src={uploadImageUrl}/>
                    
                </div>
            </div>
            <div className='signUpBtns'>
                <div className='signUpBtn' onClick={handleSignUp}>SignUp</div>
                <Link to={'/'} className='signUpBtn'>Home Page</Link>
            </div>
            {
              progressBar && <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
            }
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default SignUp;
