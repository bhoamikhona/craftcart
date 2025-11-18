import React from "react";
import "./AuthorBox.css";

export default function AuthorBox({ author }) {
  return (
    <div className="author-box">
      <img src={author.avatar} alt={author.name} />
      <div className="author-text">
        <h4>{author.name}</h4>
        <p>{author.followers} followers · {author.tutorials} tutorials</p>
      </div>
      <button className="follow-btn">Follow</button>
    </div>
  );
}
