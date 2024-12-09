import React, { useState, useEffect } from 'react';
import './video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Video = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [Videos, setVideos] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const navigate = useNavigate();

  // Fetch video details by ID
  const fetchVideoById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
      setData(response.data.video);
      setUser(response.data.user);
      setVideoUrl(response.data.video?.videoLink);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch comments for the video
  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/commentApi/comment/${id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch recommended videos
  const getRecommendVideo = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/allvideo');
      if (res.data.success && res.data.videos) {
        setVideos(res.data.videos);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
    getRecommendVideo();
  }, [id]);

  // Update likes or dislikes
  const updateLikesOrDislikes = async (videoId, likeCount, dislikeCount) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/video/${videoId}/likes-dislikes`, {
        like: likeCount,
        dislike: dislikeCount,
      });

      if (response.data.success) {
        console.log('Likes/Dislikes updated:', response.data.video);
        setData((prevData) => ({
          ...prevData,
          like: response.data.video.like,
          dislike: response.data.video.dislike,
        }));
      } else {
        console.error('Failed to update likes/dislikes');
      }
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  // Handle like button click
  const handleLike = (videoId, likeCount) => {
    setClicked(true);
    updateLikesOrDislikes(videoId, likeCount + 1, data?.dislike || 0);
  };

  // Handle dislike button click
  const handleDislike = (videoId, dislikeCount) => {
    updateLikesOrDislikes(videoId, data?.like || 0, dislikeCount + 1);
  };

  return (
    <div className="video">
      <div className="videoPostSection">
        <div className="video_youtube">
          {data && (
            <video width="400" controls autoPlay className="video_youtube_video">
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="video_youtubeAbout">
          <div className="video_utubeTitle">{data?.title}</div>
          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link to={`/user/${user?._id}`} className="youtube_video_ProfileBlock_left_img">
                <img className="youtube_video_ProfileBlock_left_image" src={user?.profilePic} alt="Profile" />
              </Link>
              <div className="youtubeVideo_subsView">
                <div className="youtubePostProfileName">{user?.userName}</div>
                <div className="youtubePostProfileSubs">{user?.createdAt.slice(0, 10)}</div>
              </div>
              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>
            <div className="youtube_video_likeBlock">
              <div
                className="youtube_video_likeBlock_like"
                onClick={() => handleLike(data?._id, data?.like || 0)}
              >
                <ThumbUpOffAltIcon />
                <div className="youtube_video_likeBlock_No.like">{data?.like}</div>
              </div>
              <div className="youtubeVideoDivider"></div>
              <div
                className="youtube_video_likeBlock_like"
                onClick={() => handleDislike(data?._id, data?.dislike || 0)}
              >
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </div>
          <div className="youtube_video_about">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>
          <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">2 Comments</div>
            <div className="youtubeSelfComment">
              <img
                className="video_youtubeSelfCommentProfile"
                src="https://example.com/profile-pic.jpg"
                alt="User Profile"
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
            {/* <div className="youtubeOtherComment">
                {
                    comments.map((item, index) => {
                        return (
                            <div className="youtubeSelfComment">
                                <img className="video_youtubeSelfCommetnProfile" src="" />
                            </div>
                        );
                    })
                }
            </div> */}
          </div>
        </div>
      </div>

      <div className="videoSuggestions">
        {Videos.length > 0 ? (
          Videos.map((video) => (
            <div
              className="videoSuggestionsBlock"
              onClick={() => navigate(`/watch/${video._id}`)}
              key={video._id}
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
                <div className="video_suggestion_about_profile">136k views, {video.createdAt}</div>
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
