import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import './videoUpload.css';

const videoUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoType, setVideoType] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', setTitle);
        formData.append('description', setDescription);
        formData.append('videoType', setVideoType);
        formData.append('thumbnail', setThumbnail);
        formData.append('video', setVideo);
    
        try {
          const response = await axios.post('http://localhost:4000/api/video', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Error uploading product');
          console.error('Error uploading product:', error);
        }
      };
  return (
    <div>
      <div className='videoUpload'>
            <div className='uploadBox'>
                <div className='uploadVideoTitle'>
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>
                <div className='uploadForm'>
                    <input
                        type='text'
                        placeholder='Title of video'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Category'
                        onChange={(e) => setVideoType(e.target.value)}
                        value={videoType}
                        className='uploadFormInput'
                    />
                    <div>
                        Thumbnail
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>
                        Video
                        <input
                            type='file'
                            accept='video/mp4, video/webm, video/*'
                            onChange={handleVideoChange}
                        />
                    </div>
                </div>
                <div className='uploadBtn'>
                    <div className='uploadBtn_form' onClick={handleSubmit}>Upload</div>
                    <div className='uploadBtn_form'>Home</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default videoUpload

