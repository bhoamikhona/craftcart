
import React from "react";
import "./VideoDetails.css";

import AuthorBox from "@/components/Videos/AuthorBox/AuthorBox";
import TutorialVideo from "@/components/Videos/TutorialVideo/TutorialVideo";
import SuppliesCard from "@/components/Videos/SuppliesCard/SuppliesCard";
import TutorialInfoCard from "@/components/Videos/TutorialInfo/TutorialInfo";
import TutorialSteps from "@/components/Videos/TutorialSteps/TutorialSteps";

// HARD CODED DATA
const tutorial = {
  id: 1,
  title: "Macramé Wall Hanging",
  description: "Create a beautiful macramé wall hanging using basic knots!",
  video: "/videos/macrame.mp4", 
  thumbnail: "/images/videos/thumbnails/4.png", 
  steps: [
    { stepNumber: 1, title: "Prepare Materials", description: "Measure and cut 5 pieces of cord (2m each)." },
    { stepNumber: 2, title: "Attach to Dowel", description: "Tie lark’s head knots to secure cords." },
    { stepNumber: 3, title: "Start Knots", description: "Begin square knots row by row." },
    { stepNumber: 4, title: "Add Design", description: "Create diamond patterns & shape." },
    { stepNumber: 5, title: "Finish & Trim", description: "Trim extra cords and finalize!" },
  ],
  products: [
    { name: "Cotton Rope (2mm)", price: "8.99" },
    { name: "Wooden Dowel", price: "5.99" },
    { name: "Fabric Scissors", price: "6.50" },
  ],
  author: {
    name: "Alexandra Smith",
    followers: "12.5k",
    tutorials: 18,
    avatar: "/images/avatars/avatar.jpg",
  },
};

export default function VideoDetailPage() {
  return (
    <div className="container">
      <div className="page-grid">
        <div className="left-section">
          <TutorialVideo video={tutorial.video} thumbnail={tutorial.thumbnail} />
          <TutorialInfoCard tutorial={tutorial} />
          <AuthorBox author={tutorial.author} />
          <TutorialSteps steps={tutorial.steps} />
        </div>

        <div className="right-section">
          <SuppliesCard products={tutorial.products} />
        </div>
      </div>
    </div>
  );
}
