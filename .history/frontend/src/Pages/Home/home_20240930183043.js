import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import HomePage from '../../components/HomePage/homePage';
import './home .css';

const home = ({SideNavbar}) => {
  return (
    <div className='home'>
      <SideNavbar SideNavbar={'sideNavbar'}/>
      <HomePage/>
    </div>
  )
}

export default home;
