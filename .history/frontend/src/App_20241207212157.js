import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/home';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Video from './Pages/Video/video';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import HistoryPage from './Pages/History/history';
import { useVoiceRecognition } from './components/Voice/VoiceSearch';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const setSideNavbarFun = (value) => {
    setSideNavbar(value);
  }
  return (
    <BrowserRouter>
    <useVoiceRecognition>
    <Navbar setSideNavbarFun={setSideNavbarFun} sideNavbar={sideNavbar}/>
    <Routes>
      <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
      <Route path='/watch/:id' element={<Video/>}/>
      <Route path='user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
      <Route path=':id/upload' element={<VideoUpload/>}/>
      <Route path='signup' element={<SignUp/>} />
      <Route path='history' element={<HistoryPage/>}/>
    </Routes>
    </useVoiceRecognition>
  );
}

export default App;
