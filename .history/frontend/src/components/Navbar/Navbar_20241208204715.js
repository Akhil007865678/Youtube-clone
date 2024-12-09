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
  const [query, setQuery] = useState("");
  const [userPic, setUserPic] = useState("https://www.istockphoto.com/photos/unknown-user");
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [listening, setListening] = useState(false);

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      console.log("Speech result:", speechResult);

      if (speechResult.includes("hey youtube")) {
        alert("Listening for your query...");
        recognition.stop();

        const commandRecognition = new window.webkitSpeechRecognition();
        commandRecognition.lang = "en-US";
        commandRecognition.interimResults = false;
        commandRecognition.maxAlternatives = 1;

        commandRecognition.start();

        commandRecognition.onresult = (commandEvent) => {
          const userQuery = commandEvent.results[0][0].transcript.toLowerCase();
          console.log("User query:", userQuery);

          // Redirect to the search page with the query
          navigate(`/search/${userQuery}`);
        };

        commandRecognition.onerror = (err) => {
          console.error("Error recognizing command:", err);
          alert("Failed to capture your query. Please try again.");
        };
      } else {
        alert("Say 'Hey YouTube' to start searching.");
      }
    };

    recognition.onerror = (err) => {
      console.error("Error recognizing speech:", err);
      alert("Speech recognition failed. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

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
  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };
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
          <form onSubmit={onSearch} className='navbar_searchBox-form'>
            <input type='text' placeholder='Search' className='navbar_searchBoxInput' onChange={(e) => setQuery(e.target.value)}/>
          </form>
          <div className='navbar_searchIconBox'><SearchIcon sx={{fontSize: "28px", color: "white"}}/></div>
        </div>
        <div className='navbar_mike' onClick={startListening} disabled={listening}>
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
