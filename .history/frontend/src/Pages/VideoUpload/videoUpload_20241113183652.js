import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import './videoUpload.css';

const videoUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setTitle] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('productType', productType);
    
        try {
          const response = await axios.post('http://localhost:5000/api/products/upload', formData, {
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
                        onChange={(e) => handleOnChangeInput(e, "title")}
                        value={}
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        value={}
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Category'
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        value={}
                        className='uploadFormInput'
                    />
                    <div>
                        Thumbnail
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => handleFileChange(e, "thumbnail")}
                        />
                    </div>
                    <div>
                        Video
                        <input
                            type='file'
                            accept='video/mp4, video/webm, video/*'
                            onChange={(e) => handleFileChange(e, "video")}
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

