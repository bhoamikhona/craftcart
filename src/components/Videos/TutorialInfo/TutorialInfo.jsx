import React from "react";
import { FaClock, FaStar, FaThumbsUp } from "react-icons/fa"; 
import "./TutorialInfo.css";

export default function TutorialInfo({ tutorial }) {
  return (
    <div className="info-card">
      <div className="tags">
        <span className="tag">Decor</span>
        <span className="tag">Beginner</span>
      </div>

      <h2 className="tutorial-title">{tutorial.title}</h2>
      <p className="tutorial-desc">{tutorial.description}</p>

      <div className="stats-row">
        <div className="stat-item">
          <FaClock className="stat-icon" />
          <span>{tutorial.duration || "2 hours"}</span>
        </div>

        <div className="stat-item">
          <FaStar className="stat-icon star-icon" />
          <span>{tutorial.rating || "4.8"} ({tutorial.reviews || 156} reviews)</span>
        </div>

        <div className="stat-item">
          <FaThumbsUp className="stat-icon thumbs-icon" />
          <span>{tutorial.likes || 892} likes</span>
        </div>
      </div>
    </div>
  );
}
