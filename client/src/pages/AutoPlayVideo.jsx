import React from 'react';
import Video from "../images/video.mp4";
// import "../css/auto.css"
const AutoPlayVideo = () => {
  return (
    <div className='video-container' style={{ marginTop: "20px", borderRadius: '5%', overflow: 'hidden' }}>
      <video
        width="100%"  
        height="auto" 
        autoPlay
        loop
        muted
        playsInline
        src={Video} 
        style={{ borderRadius: '1%' }} 
      />
    </div>
  );
}

export default AutoPlayVideo;
