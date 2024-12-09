/*import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import './videoUpload.css';

const VideoUpload = () => {
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoType: ""
    });
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const handleOnChangeInput = (event, name) => { 
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    };

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (type === "video") setVideoFile(file);
        else if (type === "thumbnail") setThumbnailFile(file);
    };

    const handleSubmit = async () => {
        if (!videoFile || !thumbnailFile) {
            console.log("Please select both a video and a thumbnail.");
            return;
        }
    
        const formData = new FormData();
        formData.append("title", inputField.title);
        formData.append("description", inputField.description);
        formData.append("videoType", inputField.videoType);
        formData.append("video", videoFile);
        formData.append("thumbnail", thumbnailFile);
    
        try {
            // Retrieve token from local storage
            const token = localStorage.getItem("token"); // or however your token is stored
    
            const response = await axios.post("http://localhost:4000/api/video", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}` // Attach token to Authorization header
                }
            });
            console.log("Upload successful:", response.data);
        } catch (error) {
            if (error.response) {
                console.error("Backend responded with an error:", error.response.data);
            } else if (error.request) {
                console.error("Request made but no response received", error.request);
            } else {
                console.error("Error in setting up request:", error.message);
            }
        }
    };
    
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





/*import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './videoUpload.css';

const VideoUpload = () => {
    
    
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
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        className='uploadFormInput'
                    />
                    <input
                        type='text'
                        placeholder='Category'
                        className='uploadFormInput'
                    />
                    <div>
                        Thumbnail
                        <input
                            type='file'
                            accept='image/*'
                        />
                    </div>
                    <div>
                        Video
                        <input
                            type='file'
                            accept='video/mp4, video/webm, video/*'
                        />
                    </div>
                </div>
                <div className='uploadBtn'>
                    <div className='uploadBtn_form'>Upload</div>
                    <Link to={'/'} className='uploadBtn_form'>Home</Link>
                </div>
            </div>
        </div>
    );
};

export default VideoUpload;