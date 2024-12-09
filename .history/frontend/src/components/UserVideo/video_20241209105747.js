import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const UserVideo = ({ sideNavbar = true }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    const fetchVideo = async () => {
        try {
            const response = await axios.get('(node:16596) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
C:\BackendFile\youtube\frontend\src\components\UserVideo\video.js:1
import React, { useEffect, useState } from 'react';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at cjsLoader (node:internal/modules/esm/translators:345:17)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:294:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)

Node.js v20.10.0
[nodemon] app crashed - waiting for file changes before starting...
');
            if (response.data && response.data.videos) {
                setVideos(response.data.videos);
            } else {
                throw new Error("Invalid API response structure");
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            setError("Unable to load videos. Please try again later.");
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    return (
        <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
            <div className="homePage_options">
                <div className="homePage_option">Welcome to Video Platform</div>
            </div>

            <div className={sideNavbar ? 'home_mainPage' : 'fullHome_mainPage'}>
                {error ? (
                    <div className="errorMessage">{error}</div>
                ) : videos.length > 0 ? (
                    videos.map((video) => (
                        <Link key={video._id} to={`/watch/${video._id}`} className="youtube_Video">
                            <div className="youtube_thumbnailBox">
                                <img
                                    src={video.thumbnail || 'https://via.placeholder.com/300x180?text=No+Thumbnail'}
                                    alt="Thumbnail"
                                    className="youtube_thumbnailPic"
                                />
                                <div className="youtube_timingThumbnail">{video.duration || '00:00'}</div>
                            </div>
                            <div className="youtubeTitleBox">
                                <div className="youtubeTitleBoxProfile">
                                    <img
                                        src={video?.user?.profilePic || 'https://via.placeholder.com/50?text=No+Profile'}
                                        alt="Profile"
                                        className="youtube_thumbnail_profile"
                                    />
                                </div>
                                <div className="youtubeTitleBox_title">
                                    <div className="youtube_videoTitle">{video?.title || 'Untitled'}</div>
                                    <div className="youtube_channelName">{video?.user?.channelName || 'Unknown Channel'}</div>
                                    <div className="youtube_videoViews">{video?.like || 0} likes</div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>No videos available</div>
                )}
            </div>
        </div>
    );
};

export default UserVideo;
