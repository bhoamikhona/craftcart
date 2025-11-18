import "./Profile.css";
import { CiLocationOn } from "react-icons/ci";
import Video from "@/components/Helpers/Video/Video.jsx";

const videoData = [
  {
    id: 1,
    src: "./images/videos/thumbnails/2.png",
    user: "Alison Garcia",
    title: "Christmas Decoration",
    views: "2M views",
    date: "3 years ago",
  },
  {
    id: 5,
    src: "./images/videos/thumbnails/5.png",
    user: "Alison Garcia",
    title: "Wall Plant Holder",
    views: "1M views",
    date: "6 months ago",
  },
  {
    id: 6,
    src: "./images/videos/thumbnails/6.png",
    user: "Alison Garcia",
    title: "Photo Frame Decor",
    views: "1.5M views",
    date: "2 years ago",
  },
  {
    id: 7,
    src: "./images/videos/thumbnails/7.png",
    user: "Alison Garcia",
    title: "Leaf Edge Envelope",
    views: "1.3M views",
    date: "1 years ago",
  },
];

export default function Profile() {
  return (
    <main className="profile__container">
      <section className="profile__details">
        <div className="profile__details--left">
          <div className="profile__img-container">
            <img
              className="profile__img"
              src="./images/avatars/avatar.jpg"
              alt="user headshot"
            />
          </div>
        </div>
        <div className="profile__details--right">
          <div className="profile__details--top">
            <h2 className="profile__username">
              Alison Garcia &nbsp; <span className="age">29</span>
            </h2>
            <div className="location">
              <CiLocationOn className="location__icon" />
              <span className="location__text">New York, USA</span>
            </div>
          </div>
          <div className="profile__details--bottom">
            <div className="profile__grid grid grid__3-cols">
              <div className="stat">
                <p className="stat-value">80K</p>
                <p className="stat-title">Followers</p>
              </div>
              <div className="stat">
                <p className="stat-value">803K</p>
                <p className="stat-title">Likes</p>
              </div>
              <div className="stat">
                <p className="stat-value">1.4K</p>
                <p className="stat-title">Videos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="profile__videos">
        <div className="grid grid__3-cols">
          {videoData.map((v) => (
            <Video
              key={v.id}
              src={v.src}
              user={v.user}
              title={v.title}
              views={v.views}
              date={v.date}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
