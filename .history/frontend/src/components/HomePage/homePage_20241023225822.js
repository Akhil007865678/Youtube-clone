import React, {} from 'react'
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const homePage = ({sideNavbar}) => {
  useEffect(() => {
    axios.get('http://localhost:4000/api/allvideo').then(res =>{
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  },[]);
  return (
    <div className={sideNavbar?'homePage':'fullHomePage'}>

      <div className='homePage_options'>
        <div className='homePage_option'>akhil</div>
      </div>

      <div className={sideNavbar?'home_mainPage':'fullHome_mainPage'}>

        <Link to={'/watch/123'} className='youtube_Video'>
          <div className='youtube_thumbnailBox'>
            <img src='https://images.ctfassets.net/hrltx12pl8hq/3BbOocYyyYPqPxEvn5HNDA/9e02624cac9aad554e0cd95c3b5c31c3/Golden-Hour-Thumbnail.jpg' alt='Thumbnail' className='youtube_thumbnailPic'/>
            <div className='youtube_timingThumbnail'>28:05</div>
          </div>
          <div className='youtubeTitleBox'>
            <div className='youtubeTitleBoxProfile'>
              <img src='https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w' alt='profile' className='youtube_thumbnail_profile'/>
            </div>

            <div className='youtubeTitleBox_title'>
              <div className='youtube_videoTitle'>User1</div>
              <div className='youtube_channelName'>User1</div>
              <div className='youtube_videoViews'>3 Likes</div>
            </div>
          </div>
        </Link>

        <div className='youtube_Video'>
          <div className='youtube_thumbnailBox'>
            <img src='https://images.ctfassets.net/hrltx12pl8hq/3BbOocYyyYPqPxEvn5HNDA/9e02624cac9aad554e0cd95c3b5c31c3/Golden-Hour-Thumbnail.jpg' alt='Thumbnail' className='youtube_thumbnailPic'/>
            <div className='youtube_timingThumbnail'>28:05</div>
          </div>
          <div className='youtubeTitleBox'>
            <div className='youtubeTitleBoxProfile'>
              <img src='https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w' alt='profile' className='youtube_thumbnail_profile'/>
            </div>

            <div className='youtubeTitleBox_title'>
              <div className='youtube_videoTitle'>User1</div>
              <div className='youtube_channelName'>User1</div>
              <div className='youtube_videoViews'>3 Likes</div>
            </div>
          </div>
        </div>

        <div className='youtube_Video'>
          <div className='youtube_thumbnailBox'>
            <img src='https://images.ctfassets.net/hrltx12pl8hq/3BbOocYyyYPqPxEvn5HNDA/9e02624cac9aad554e0cd95c3b5c31c3/Golden-Hour-Thumbnail.jpg' alt='Thumbnail' className='youtube_thumbnailPic'/>
            <div className='youtube_timingThumbnail'>28:05</div>
          </div>
          <div className='youtubeTitleBox'>
            <div className='youtubeTitleBoxProfile'>
              <img src='https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w' alt='profile' className='youtube_thumbnail_profile'/>
            </div>

            <div className='youtubeTitleBox_title'>
              <div className='youtube_videoTitle'>User1</div>
              <div className='youtube_channelName'>User1</div>
              <div className='youtube_videoViews'>3 Likes</div>
            </div>
          </div>
        </div>

        <div className='youtube_Video'>
          <div className='youtube_thumbnailBox'>
            <img src='https://images.ctfassets.net/hrltx12pl8hq/3BbOocYyyYPqPxEvn5HNDA/9e02624cac9aad554e0cd95c3b5c31c3/Golden-Hour-Thumbnail.jpg' alt='Thumbnail' className='youtube_thumbnailPic'/>
            <div className='youtube_timingThumbnail'>28:05</div>
          </div>
          <div className='youtubeTitleBox'>
            <div className='youtubeTitleBoxProfile'>
              <img src='https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w' alt='profile' className='youtube_thumbnail_profile'/>
            </div>

            <div className='youtubeTitleBox_title'>
              <div className='youtube_videoTitle'>User1</div>
              <div className='youtube_channelName'>User1</div>
              <div className='youtube_videoViews'>3 Likes</div>
            </div>
          </div>
        </div>

        <div className='youtube_Video'>
          <div className='youtube_thumbnailBox'>
            <img src='https://images.ctfassets.net/hrltx12pl8hq/3BbOocYyyYPqPxEvn5HNDA/9e02624cac9aad554e0cd95c3b5c31c3/Golden-Hour-Thumbnail.jpg' alt='Thumbnail' className='youtube_thumbnailPic'/>
            <div className='youtube_timingThumbnail'>28:05</div>
          </div>
          <div className='youtubeTitleBox'>
            <div className='youtubeTitleBoxProfile'>
              <img src='https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w' alt='profile' className='youtube_thumbnail_profile'/>
            </div>

            <div className='youtubeTitleBox_title'>
              <div className='youtube_videoTitle'>User1</div>
              <div className='youtube_channelName'>User1</div>
              <div className='youtube_videoViews'>3 Likes</div>
            </div>
          </div>
        </div>

        <div className='youtube_Video'>
          <div className='youtube_thumbnailBox'>
            <img src='https://images.ctfassets.net/hrltx12pl8hq/3BbOocYyyYPqPxEvn5HNDA/9e02624cac9aad554e0cd95c3b5c31c3/Golden-Hour-Thumbnail.jpg' alt='Thumbnail' className='youtube_thumbnailPic'/>
            <div className='youtube_timingThumbnail'>28:05</div>
          </div>
          <div className='youtubeTitleBox'>
            <div className='youtubeTitleBoxProfile'>
              <img src='https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w' alt='profile' className='youtube_thumbnail_profile'/>
            </div>

            <div className='youtubeTitleBox_title'>
              <div className='youtube_videoTitle'>User1</div>
              <div className='youtube_channelName'>User1</div>
              <div className='youtube_videoViews'>3 Likes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage;
