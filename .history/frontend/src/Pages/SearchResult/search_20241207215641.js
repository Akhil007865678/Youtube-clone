import React, {useState, useEffect} from 'react'

const search = () => {
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
        getRecommendVideo();
        getComments();
        addToHistory(id);
    }, [id]);
  return (
    <div>
      
    </div>
  )
}

export default search;

