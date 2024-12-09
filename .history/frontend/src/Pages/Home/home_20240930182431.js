import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import HomePage from '../../components/HomePage/homePage';
import './home .css';

const home = () => {
  return (
    <div className='home'>
      <SideNavbar />
      <HomePage/>
    </div>
  )
}

export default home;
