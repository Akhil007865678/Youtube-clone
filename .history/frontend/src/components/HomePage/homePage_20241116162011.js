import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allvideo');
        setData(res.data);
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className='homePage_options'>
        <div className='homePage_option'>akhil</div>
      </div>

      <div className={sideNavbar ? 'home_mainPage' : 'fullHome_mainPage'}>
        {data.length > 0 ? ( 
          data.map((item) => (
            <Link key={item._id} to={`/watch/${item._id}`} className='youtube_Video'>
              <div className='youtube_thumbnailBox'>
                <img src={item.thumbnail} alt='Thumbnail' className='youtube_thumbnailPic' />
                <div className='youtube_timingThumbnail'>28:05</div>
              </div>
              <div className='youtubeTitleBox'>
                <div className='youtubeTitleBoxProfile'>
                  <img src={item?.user?.profilePic} alt='profile' className='youtube_thumbnail_profile' />
                </div>
                <div className='youtubeTitleBox_title'>
                  <div className='youtube_videoTitle'>{item?.title}</div>
                  <div className='youtube_channelName'>{item?.user?.channelName}</div>
                  <div className='youtube_videoViews'>{item?.like} likes</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No videos available</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
