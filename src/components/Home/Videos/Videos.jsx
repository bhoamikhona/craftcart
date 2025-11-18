import Video from "../../Helpers/Video/Video.jsx";
import "./Videos.css";

const videoData = [
  {
    id: 1,
    src: "./images/videos/thumbnails/1.png",
    user: "alexandra smith",
    title: "Lotus Pop Up Card",
    views: "1.5M views",
    date: "2 days ago",
  },
  {
    id: 2,
    src: "./images/videos/thumbnails/2.png",
    user: "Alison Garcia",
    title: "Christmas Decoration",
    views: "2M views",
    date: "3 years ago",
  },
  {
    id: 3,
    src: "./images/videos/thumbnails/3.png",
    user: "James Fraser",
    title: "Customized Dresser",
    views: "2.2M views",
    date: "2 years ago",
  },
];

export default function Videos() {
  return (
    <section className="section__videos">
      <h2 className="section__title">Let’s Create Something Beautiful</h2>
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
  );
}
