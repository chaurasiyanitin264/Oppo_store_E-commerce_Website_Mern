import React from 'react';
import Video from "../images/video.mp4";
// import "../css/auto.css"
const AutoPlayVideo = () => {
  return (
    <div className='video-container' style={{ marginTop: "20px", borderRadius: '5%', overflow: 'hidden' }}>
      <video
        width="100%"  // Adjust width to 100% for responsiveness
        height="auto" // Maintain aspect ratio of the video
        autoPlay
        loop
        muted
        playsInline
        src={Video} // Path to your video file
        style={{ borderRadius: '1%' }} // Apply border-radius to the video itself
      />
    </div>
  );
}

export default AutoPlayVideo;
