import React, {useState, useEffect} from 'react'

const search = () => {
    const fetchVideo = async(id) => {
        try{
            axios.get(``)
        } catch(error){
            console.log('video not fetched...')
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

