import React from 'react'
import './sideNavbar.css';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Link } from 'react-router-dom';

const sideNavbar = ({sideNavbar}) => {
    
  return (
    <div>
      <div className={sideNavbar ? 'home-sideNavbar' : 'homeSideNavbarHide'}>
        <div className='home_sideNavbarTop'>
            <div className={`home_sideNavbarTopOption`}>
                <HomeIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Home</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <VideocamIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Shorts</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <SubscriptionsIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Subscriptions</div>
            </div>
        </div>
        <div className='home_sideNavbarMiddle'>
            <div className={`home_sideNavbarTopOption`}>
                <div className='home_sideNavbarTopOptionTitle'>You</div>
                <ChevronRightIcon/>
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <RecentActorsIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your Channel</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <HistoryIcon/>
                <Link to={'/history'} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className='home_sideNavbarTopOptionTitle'>History</Link>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <PlaylistAddIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Playlist</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <SmartDisplayIcon/>
                <Link to={} className='home_sideNavbarTopOptionTitle'>Your videos</Link>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <WatchLaterIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Watch later</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <ThumbUpIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Liked videos</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <ContentCutIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your clips</div>
            </div>
        </div>
        <div className='home_sideNavbarMiddle'>
            <div className='home_sideNavbarTopOption'>
                <div className='home_sidenavbarTopOperationTitleHeader'>Subscription</div>
            </div>
            <div className='home_sideNavbarTopOption'>
                <img className='home_sideNavbar_ImgLogo' src='' alt=''/>
                <div className='home_sideNavbarTopOperationTitleHeader'>Aaj Tak</div>
            </div>
            <div className='home_sideNavbarTopOption'>
                <img className='home_sideNavbar_ImgLogo' src='' alt=''/>
                <div className='home_sideNavbarTopOperationTitleHeader'>The LallanTop</div>
            </div>
            <div className='home_sideNavbarTopOption'>
                <img className='home_sideNavbar_ImgLogo' src='' alt=''/>
                <div className='home_sideNavbarTopOperationTitleHeader'>NDTV India</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default sideNavbar
