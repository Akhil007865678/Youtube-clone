import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import 
import './home .css';

const Search = ({sideNavbar}) => {
  return (
    <div className='home'>
      <SideNavbar sideNavbar={sideNavbar}/>
      <HomePage sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Search;