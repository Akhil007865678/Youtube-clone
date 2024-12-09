import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import './videoUpload.css';


    return (
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
                        value={inputField.title}
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        value={inputField.description}
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Category'
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        value={inputField.videoType}
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
    );
};

export default VideoUpload;