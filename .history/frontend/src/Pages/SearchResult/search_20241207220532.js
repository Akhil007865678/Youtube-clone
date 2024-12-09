import React, {useState, useEffect} from 'react';
//import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const search = () => {
    const fetchVideo = async(id) => {
        try{
            await axios.get(`http://localhost:4000/api/allvideo`)
        } catch(error){
            console.log('video not fetched...');
        }
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

