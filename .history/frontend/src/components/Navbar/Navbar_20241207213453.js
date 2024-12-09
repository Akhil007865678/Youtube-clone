import React, {useState} from 'react';
import Menu from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
//import PersonIcon from '@mui/icons-material/Person';
import Login from '../Login/login';
import './navbar.css';
import { jwtDecode } from 'jwt-decode';
//import sideNavbar from '../SideNavbar/sideNavbar';

const Navbar = ({setSideNavbarFun, sideNavbar}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [query, setQuery] 
  const [userPic, setUserPic] = useState("https://www.istockphoto.com/photos/unknown-user");
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  const handleClickModal = () => {
    setNavbarModal(prev => !prev);
  }
  const sideNavbarFun = () => {
      setSideNavbarFun(!sideNavbar);
  } 
  const uploadVideo = () => {
    navigate('/23/upload');
  }
  const onClickofPopUpOption = (button) => {
    setNavbarModal(false);
    if(button === "login"){
      setLogin(true);
    } else{

    }
  }
  const setLoginModal=() => {
    setLogin(false);
  }
  const navigateToProfile = () => {
    navigate(`/user/${userId}`);
  };
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <div className='navbarHamberger' onClick={sideNavbarFun}>
            <Menu sx={{color: "white"}}/>
        </div>
        <div className='navbar_youtubeImg' onClick={() => navigate('/')}>
          <YouTubeIcon sx={{fontSize: "34px"}} className='navbar_youtubeImage'/>
          <div className='navbar_utubeTitle'>YouTube</div>
        </div>
      </div>
      <div className='navbar-middle'>
        <div className='navbar-searchBox'>
          <form onSubmit={onSearch}>
            <input type='text' placeholder='Search' className='navbar_searchBoxInput' onChange={(e) => setQuery(e.target.value)}/>
          </form>
          <div className='navbar_searchIconBox'><SearchIcon sx={{fontSize: "28px", color: "white"}}/></div>
        </div>
        <div className='navbar_mike'>
            <KeyboardVoiceIcon sx={{color: "white"}}/>
        </div>
      </div>
      <div className='navbar-right'>
          <VideoCallIcon onClick={uploadVideo} sx={{fontSize: "30px", cursor: "pointer", color: "white"}}/>
          <NotificationsActiveIcon sx={{fontSize: "30px", cursor: "pointer", color: "white"}}/>
          <img onClick={handleClickModal} src={userPic} className='navbar-right-logo' alt='Logo'/>

          { navbarModal &&
            <div className='navbar-modal'>
            <div className='navbar-modal-option' onClick={navigateToProfile}>Profile</div>
            <div className='navbar-modal-option' onClick={() => onClickofPopUpOption("login")}>Login</div>
            <div className='navbar-modal-option' onClick={() => onClickofPopUpOption("logout")}>Logout</div>
          </div>
          }
      </div>
      {
        login && <Login setLoginModal={setLoginModal}/>
      }
    </div>
  )
}

export default Navbar;
