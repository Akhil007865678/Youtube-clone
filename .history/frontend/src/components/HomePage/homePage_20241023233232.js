import React, {useEffect, useState} from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({sideNavbar}) => {
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    axios.get('http://localhost:4000/api/allvideo')
      .then(res => {
        console.log(res.data); // Log the response to verify
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>

      <div className='homePage_options'>
        <div className='homePage_option'>akhil</div>
      </div>

      <div className={sideNavbar ? 'home_mainPage' : 'fullHome_mainPage'}>
        {
          Array.isArray(data) && data.map((item, index) => (
            <Link to={`/watch/${item._id}`} className='youtube_Video' key={item._id || index}>
              <div className='youtube_thumbnailBox'>
                <img src={item.thumbnail} alt='Thumbnail' className='youtube_thumbnailPic'/>
                <div className='youtube_timingThumbnail'>28:05</div>
              </div>
              <div className='youtubeTitleBox'>
                <div className='youtubeTitleBoxProfile'>
                  <img src={item?.user?.profilePic} alt='profile' className='youtube_thumbnail_profile'/>
                </div>
                <div className='youtubeTitleBox_title'>
                  <div className='youtube_videoTitle'>{item?.title}</div>
                  <div className='youtube_channelName'>{item?.user?.channelName}</div>
                  <div className='youtube_videoViews'>{item?.like} likes</div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default HomePage;