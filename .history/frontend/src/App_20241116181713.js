import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/home';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Video from './Pages/Video/video';
//import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const setSideNavbarFun = (value) => {
    setSideNavbar(value);
  }
  return (
    <BrowserRouter>
    <Navbar setSideNavbarFun={setSideNavbarFun} sideNavbar={sideNavbar}/>
    <Routes>
      <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
      <Route path='/watch/:id' element={<Video/>}/>
      <Route path='user/:id' element={<Profile/>}/>
      <Route path=':id/upload' element={<VideoUpload/>}/>
      <Route path='signup' element={<SignUp/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
