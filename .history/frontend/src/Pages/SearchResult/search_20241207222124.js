import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './search.css';

const Search = () => {
    const [videos, setVideos] = useState([]);

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/allvideo`);
            setVideos(response.data.videos);
        } catch (error) {
            console.log('Error fetching videos:', error);
        }
    };
    useEffect(() => {
        fetchVideo();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
           <div className='video_youtube'>
            {data && <video width="400" controls autoPlay className='video_youtube_video'>
                <source src={videoUrl} type='video/mp4'/>
                <source src={videoUrl} type='video/webm'/>
                your Browser does not support the video tag
            </video>}
        </div>
        
        </div>
    );
};

export default Search;
