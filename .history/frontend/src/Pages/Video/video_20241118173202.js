import React, { useState, useEffect } from 'react';
import './video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [isClicked, setClicked] = useState(false);

  // Fetch video by ID
  const fetchVideoById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
      setData(response.data.video);
      setUser(response.data.user);
      setVideoUrl(response.data.video?.videoLink);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // Fetch comments by video ID
  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/commentApi/comment/${id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Fetch recommended videos
  const getRecommendVideo = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/allvideo');
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        console.error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    }
  };

  // Update likes or dislikes
  const updateLikesOrDislikes = async (videoId, likeCount, dislikeCount) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/video/${videoId}/likes-dislikes`, {
        like: likeCount,
        dislike: dislikeCount,
      });
      if (response.data.success) {
        fetchVideoById(); // Refresh video data
      } else {
        console.error('Failed to update likes/dislikes');
      }
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  // Handle like/dislike
  const handleLike = (videoId, likeCount) => {
    setClicked(true);
    updateLikesOrDislikes(videoId, likeCount + 1, 0);
  };

  const handleDislike = (videoId, dislikeCount) => {
    updateLikesOrDislikes(videoId, 0, dislikeCount + 1);
  };

  // Fetch data on component mount or when `id` changes
  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
    getRecommendVideo();
  }, [id]);

  return (
    <div className="video">
      {/* Main Video Section */}
      <div className="videoPostSection">
        {/* Video Player */}
        <div className="video_youtube">
          {data && (
            <video width="400" controls autoPlay className="video_youtube_video">
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Video Details */}
        <div className="video_youtubeAbout">
          <div className="video_utubeTitle">{data?.title}</div>
          <div className="youtube_video_ProfileBlock">
            {/* User Details */}
            <div className="youtube_video_ProfileBlock_left">
              <Link to={`/user/${user?._id}`} className="youtube_video_ProfileBlock_left_img">
                <img
                  className="youtube_video_ProfileBlock_left_image"
                  src={user?.profilePic}
                  alt="User"
                />
              </Link>
              <div className="youtubeVideo_subsView">
                <div className="youtubePostProfileName">{user?.userName}</div>
                <div className="youtubePostProfileSubs">{user?.createdAt.slice(0, 10)}</div>
              </div>
              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>

            {/* Like/Dislike Buttons */}
            <div className="youtube_video_likeBlock">
              <div
                className="youtube_video_likeBlock_like"
                onClick={() => handleLike(id, data?.like)}
              >
                <ThumbUpOffAltIcon />
                <div className="youtube_video_likeBlock_No.like">{data?.like}</div>
              </div>
              <div className="youtubeVideoDivider"></div>
              <div
                className="youtube_video_likeBlock_like"
                onClick={() => handleDislike(id, data?.dislike)}
              >
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="youtube_video_about">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>

          {/* Comments Section */}
          <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
            <div className="youtubeSelfComment">
              <img
                className="video_youtubeSelfCommentProfile"
                src="https://example.com/default-profile.jpg"
                alt="Profile"
              />
              <div className="addComment">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="addCommentInput"
                  placeholder="Add a Comment"
                />
                <div className="cancelSubmitCommetn">
                  <div className="cancelComment">Cancel</div>
                  <div className="cancelComment">Comment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Videos */}
      <div className="videoSuggestions">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="videoSuggestionsBlock"
              onClick={() => navigate(`/watch/${video._id}`)}
            >
              <div className="video_suggestion_thumbnail">
                <img
                  className="video_suggestion_thumbnail_img"
                  src={video.thumbnail}
                  alt="Thumbnail"
                />
              </div>
              <div className="video_suggestion_block">
                <div className="video_suggestion_about_title">{video.title}</div>
                <div className="video_suggestion_about_profile">Cricket T20</div>
                <div className="video_suggestion_about_profile">
                  136k views, {video.createdAt}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No videos available</div>
        )}
      </div>
    </div>
  );
};

export default Video;
