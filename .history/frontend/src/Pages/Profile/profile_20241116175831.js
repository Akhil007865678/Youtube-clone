import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
  const { id } = useParams();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [user, setUser] = useState(null); // Initialize as null

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
      console.log(response);
      setData(response.data.video || []); // Use fallback to an empty array
      setUser(response.data.video[0]?.user || null); // Use fallback to null
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  if (!user) {
    // Render a loading state if user data isn't available yet
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile">
      <h1>hello</h1>
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? 'profile_page' : 'profile_page_inactive'}>
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={user.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
            />
          </div>
          <div className="profile_top_section_about">
            <div className="profile_top_section_about_name">
              {user.channelName || 'No channel name'}
            </div>
            <div className="profile_top_section_info">
              {user.userName || 'No username'} · {data.length} videos
            </div>
            <div className="profile_top_section_info">
              {user.about || 'No description available.'}
            </div>
          </div>
        </div>

        <div className="profile_videos">
          <div className="profile_video_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="profileVideos">
            {data.length > 0 ? (
              data.map((item) => (
                <Link
                  key={item._id}
                  to={`/watch/${item._id}`}
                  className="profileVideo_block"
                >
                  <div className="profileVideo_block_thumbnail">
                    <img
                      className="profileVideo_block_thumbnail_img"
                      src={item?.thumbnail || 'https://via.placeholder.com/150'}
                      alt="Thumbnail"
                    />
                  </div>
                  <div className="profileVideo_block_details">
                    <div className="profileVideo_block_details_name">
                      {item?.title || 'Untitled'}
                    </div>
                    <div className="profileVideo_block_details_about">
                      Created at {item?.createdAt?.slice(0, 10) || 'N/A'}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
