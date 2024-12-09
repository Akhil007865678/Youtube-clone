import React,{useState, useEffect} from 'react';
import './profile.css';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const Profile = ({sideNavbar}) => {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const fetchProfileData = async () => {
    axios.get(`http://localhost:4000/api/${id}/channel`).then((response) => {
      console.log(response);
      setData(response.data.video);
      setUser(response.data.video[0]?.user);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchProfileData();
  },[])

  return (
    <div className='profile'>
      <SideNavbar sideNavbar={sideNavbar}/>

      <div className={sideNavbar ? 'profile_page':'profile_page_inactive'}>
          <div className='profile_top_section'>
            <div className='profile_top_section_profile'>
              <img className='profile_top_section_img' src={user?.profilePic}/>
            </div>
            <div className='profile_top_section_about'>
              <div className='profile_top_section_about_name'>{user?.channelName}</div>
              <div className='profile_top_section_info'>
                {user?.userName}  . {data.length} videos
              </div>
              <div className='profile_top_section_info'>
                {user?.about}
              </div>
            </div>
          </div>
          <div className='profile_videos'>
            <div className='profile_video_title'>
              Videos &nbsp; <ArrowRightIcon/>
            </div>
            <div className='profileVideos'>
              {
                data.map((item, key) => {
                  return(
                    <Link to={`/watch/${item._id}`} className='profileVideo_block'>
                      <div className='profileVideo_block_thumbnail'>
                        /*<img className='profileVideo_block_thumbnail_img' src={item?.thumbnail}/>*/
                      </div>
                      <div className='profileVideo_block_details'>
                        <div className='profileVideo_block_details_name'>{item?.title}</div>
                        <div className='profileVideo_block_details_about'>Create at {item?.createdAt.slice(0,10)}</div>
                      </div>
                    </Link>
                  );
                })
              }
              
            </div>
            
          </div>
      </div>
    </div>
  )
}

export default Profile;
