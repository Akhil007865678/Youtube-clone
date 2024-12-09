import { useEffect } from "react";
import React{useEffect} from 'react';

function UserVideo() {
    const [filter, setFilter] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  
  const fetchVideo = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/allvideo');
      setFilter(response.data.videos);
      setVideos(response.data.videos);
    } catch (error) {
      console.log('Error fetching videos:', error);
    }
  };
  
  useEffect(() => {
    if (!id) {
      setVideos(filter);
    } else {
      const filtered = filter.filter(
        (video) =>
          video.title.toLowerCase().includes(id.toLowerCase()) ||
          video.user?.channelName?.toLowerCase().includes(id.toLowerCase())
      );
      setVideos(filtered);
    }
  }, [id, filter]);

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div>
      
    </div>
  )
}

export default UserVideo;
