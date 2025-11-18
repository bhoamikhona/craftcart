
import React from "react";
import "./TutorialVideo.css";

export default function TutorialVideo({ video, thumbnail }) {
  return (
    <div className="video-wrapper">
      <video 
        controls 
        poster={thumbnail} 
        className="video-player"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
