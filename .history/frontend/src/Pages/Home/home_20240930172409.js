import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import homePage from '../../components/HomePage/homePage';
import './home .css';

const home = () => {
  return (
    <div className='home'>
      <SideNavbar/>
      <homePage/>
    </div>
  )
}

export default home;
