//import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//import { Link, useParams } from 'react-router-dom';
//import axios from 'axios';

const Profile = ({ sideNavbar }) => {
  
  return (
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? 'profile_page' : 'profile_pageprofile_page_inactive'}>
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={ 'https://via.placeholder.com/150'}
              alt="Profile"
            />
          </div>
          <div className="profile_top_section_about">
            <div className="profile_top_section_about_name">
              {'No channel name'}
            </div>
            <div className="profile_top_section_info">
              {'No username'} · {} videos
            </div>
            <div className="profile_top_section_info">
              {'No description available.'}
            </div>
          </div>
        </div>

        <div className="profile_videos">
          <div className="profile_video_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="profileVideos">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
