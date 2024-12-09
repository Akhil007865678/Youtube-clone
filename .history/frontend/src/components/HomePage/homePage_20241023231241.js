import React, {useEffect, useState} from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({sideNavbar}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allvideo');
        setData(res.data);
        //setLoading(false);
      } catch (error) {
        console.log('Error fetching videos:', error);
        //setLoading(false);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className={sideNavbar?'homePage':'fullHomePage'}>

      <div className='homePage_options'>
        <div className='homePage_option'>akhil</div>
      </div>

      <div className={sideNavbar?'home_mainPage':'fullHome_mainPage'}>

        {
          data?.map((item, index) =. {
            return 
          })
        }
        

       
      </div>
    </div>
  )
}

export default HomePage;
