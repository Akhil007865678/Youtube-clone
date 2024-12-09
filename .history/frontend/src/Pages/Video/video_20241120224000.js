import React, {useState, useEffect} from 'react'
import './video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [Videos, setVideos] = useState("");
    const {id} = useParams();
    const [comments, setComments] = useState([]);
    const [isClicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const fetchVideoById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`,).then((response) => {
            console.log(response.data.video)
            setData(response.data.video);
            setUser(response.data.user);
            setVideoUrl(response?.data?.video?.videoLink);
        }).catch(error => {
            console.log(error);
        })
    }
    const addComments = async () => {
        try {
            await axios.post(`http://localhost:4000/commentApi/comment`,{message, video: id,},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            alert('Comment added successfully');
            setMessage("");
            getCommentByVideoId();
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Something went wrong, please try again later');
        }
    };
    const getComments = async () => {
        try{
            await('htt')
        }
    }
    
    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:3000/commentApi/comment/${id}`).then((response) => {
            
            setComments(response.data.comments);
        }).catch(error => {
            console.log(error);
        })
    }
    const getRecommendVideo = async () => {
        try{
            const res = await axios.get('http://localhost:4000/api/allvideo');
            if (res.data.success && res.data.videos) {
              setVideos(res.data.videos);
            } else {
              throw new Error('Invalid response structure');
            }
        }
        catch (err) {
            console.error('Error fetching videos:', err);
          }
    }

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
        getRecommendVideo();
    }, [id]);
    
    const updateLikesOrDislikes = async (id, likeCount, dislikeCount) => {
        try {
          const response = await axios.put(`http://localhost:4000/api/video/${id}/likes-dislikes`, {
            like: likeCount,
            deslike: dislikeCount,
          });
      
          if (response.data.success) {
            console.log('Likes/Dislikes updated:', response.data.video);
            fetchVideoById();
          } else {
            console.error('Failed to update likes/dislikes');
          }
        } catch (error) {
          console.error('Error updating likes/dislikes:', error);
        }
      };      
    
    const handleLike = (id, likeCount) => {
      setClicked(true);
      updateLikesOrDislikes(id, likeCount + 1, 0);
    };
    
    const handleDislike = (id, dislikeCount) => {
      updateLikesOrDislikes(id, 0, dislikeCount + 1);
    };
    
  return (
    <div className='video'>
      <div className='videoPostSection'>
        <div className='video_youtube'>
            {data && <video width="400" controls autoPlay className='video_youtube_video'>
                <source src={videoUrl} type='video/mp4'/>
                <source src={videoUrl} type='video/webm'/>
                your Browser does not support the video tag
            </video>}
        </div>
        <div className='video_youtubeAbout'>
            <div className='video_utubeTitle'>{data?.title}</div>
            <div className='youtube_video_ProfileBlock'>
                <div className='youtube_video_ProfileBlock_left'>
                    <Link to={`/user/${user?._id}`} className='youtube_video_ProfileBlock_left_img'>
                        <img className='youtube_video_ProfileBlock_left_image' src={user?.profilePic}/>
                    </Link>
                    <div className='youtubeVideo_subsView'>
                        <div className='youtubePostProfileName'>{user?.userName}</div>
                        <div className='youtubePostProfileSubs'>{user?.createdAt.slice(0,10)}</div>
                    </div>
                    <div className='subscribeBtnYoutube'>Subscribe</div>
                </div>
                <div className='youtube_video_likeBlock'>
                    <div className='youtube_video_likeBlock_like' onClick={() => handleLike(id, data?.like)}>
                        <ThumbUpOffAltIcon/>
                        <div className='youtube_video_likeBlock_No.like'>{data?.like}</div>
                    </div>
                    <div className='youtubeVideoDivider'></div>
                    <div className='youtube_video_likeBlock_like' onClick={() => handleDislike(id, data?.dislike)}>
                        <ThumbDownOffAltIcon/>
                    </div>
                </div>
            </div>
            <div className='youtube_video_about'>
                <div>{data?.createdAt.slice(0, 10)}</div>
                <div>{data?.description}</div>
            </div>
            <div className='youtubeCommentSection'>
                <div className='youtubeCommentSectionTitle'>2 Comment</div>
                <div className='youtubeSelfComment'>
                    <img className='video_youtubeSelfCommentProfile' src='https://imgs.search.brave.com/s7h4GwPFE3nOh8I-uZHXR22kIbzwafCF_Bye8A6B0io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL0xpZmVz/dHlsZS0xMDMzNDU3/MjUwLmpwZw'/>
                    <div className='addComment'>
                        <input type='text' value={message} onChange={(e)=>{setMessage(e.target.value)}} className='addCommentInput' placeholder='Add a Comment'/>
                        <div className='cancelSubmitCommetn'>
                            <div className='cancelComment'>Cancel</div>
                            <div className='cancelComment' onClick={() => addComments()}>Comment</div>
                        </div>
                    </div>
                </div>
                {/* <div className='youtubeOtherComment'>
                    {
                        comments.map((item, index) => {
                            return (
                                <div className='youtubeSelfComment'>
                                    <img className='video_youtubeSelfCommetnProfile' src=''/>
                                </div>
                            );
                        })
                    }
                </div> */}

            </div>
        </div>
      </div>

      <div className='videoSuggestions'>
      {Videos.length > 0 ? (
          Videos.map((video) => (
            <div className='videoSuggestionsBlock' onClick={() => navigate(`/watch/${video._id}`)}>
                <div className='video_suggestion_thumbnail'>
                    <img className='video_suggestion_thumbnail_img' src={video.thumbnail} alt='thumbnail..'/>
                </div>
                <div className='video_suggestion_block'>
                    <div className='video_suggestion_about_title'>{video.title}</div>
                    <div className='video_suggestion_about_profile'>Cricket T20</div>
                    <div className='video_suggestion_about_profile'>136k views, {video.createdAt}</div>
                </div>
            </div>
            ))
            ) : (
              <div>No videos available</div>
            )}
      </div>
    </div>
  )
}

export default Video;
