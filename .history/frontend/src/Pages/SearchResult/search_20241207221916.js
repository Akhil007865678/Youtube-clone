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
            <h1 className='hello'>All Videos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {videos.map((video) => (
                    <div 
                        key={video._id} 
                        style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '300px' }}
                    >
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                        <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
                        />
                        <a 
                            href={`/watch/${video._id}`} 
                            style={{ textDecoration: 'none', color: 'blue', marginTop: '8px', display: 'block' }}
                        >
                            Watch Video
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
