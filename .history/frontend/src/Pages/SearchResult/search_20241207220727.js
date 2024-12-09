import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const search = () => {

    
    const fetchVideo = async(id) => {
        await axios.get(`http://localhost:3000/api/allvideo}`).then((response) => {
            
            setComments(response.data.comments);
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        fetchVideo();
    });
  return (
    <div>
      
    </div>
  )
}

export default search;

