import { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import { Link } from 'react-router-dom';

const HistoryPage = (sideNavbar) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:4000/User-history/fetch-history', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setHistory(response.data.history);
            } catch (error) {
                console.log('Failed to fetch history', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className='history'>
            <h2>Your Watch History</h2>
            <div className={sideNavbar ? 'home_mainPage' : 'fullHome_mainPage'}>
                {history.length > 0 ? (
                  history.map((item) => (
                    <Link key={item._id} to={`/watch/${item._id}`} className="youtube_Video">
                      <div className="youtube_thumbnailBox">
                        <img
                          src={item.videoId.thumbnail}
                          alt="Thumbnail"
                          className="youtube_thumbnailPic"
                        />
                        <div className="youtube_timingThumbnail">28:05</div>
                      </div>
                      <div className="youtubeTitleBox">
                        <div className="youtubeTitleBoxProfile">
                          <img
                            src={item?.user?.profilePic}
                            alt="Profile"
                            className="youtube_thumbnail_profile"
                          />
                        </div>
                        <div className="youtubeTitleBox_title">
                          <div className="youtube_videoTitle">{item?.title || 'Untitled'}</div>
                          <div className="youtube_channelName">{item?.user?.channelName || 'Unknown Channel'}</div>
                          <div className="youtube_videoViews">{item?.like || 0} likes</div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No videos available</div>
                )}
              </div>


            {history.map((item) => (
                <Link key={item._id} to={`/watch/${item.videoId._id}`} className='history-video'>
                    <img src={item.videoId.thumbnail} alt='....'/>
                    <p>{item.videoId.title}</p>
                    <p>Watched on: {new Date(item.watchedAt).toLocaleString()}</p>
                </Link>
            ))}
        </div>
    );
};

export default HistoryPage;
