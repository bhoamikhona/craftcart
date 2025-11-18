import "./VideoGallery.css";
import Video from "@/components/Helpers/Video/Video.jsx";
import Searchbar from "@/components/Helpers/Searchbar/Searchbar.jsx";

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
  {
    id: 4,
    src: "./images/videos/thumbnails/4.png",
    user: " Michael Lee",
    title: "Macrame Curtain Tie",
    views: "1.8M views",
  },
  {
    id: 5,
    src: "./images/videos/thumbnails/1.png",
    user: "alexandra smith",
    title: "Lotus Pop Up Card",
    views: "1.5M views",
    date: "2 days ago",
  },
  {
    id: 6,
    src: "./images/videos/thumbnails/2.png",
    user: "Alison Garcia",
    title: "Christmas Decoration",
    views: "2M views",
    date: "3 years ago",
  },
  {
    id: 7,
    src: "./images/videos/thumbnails/3.png",
    user: "James Fraser",
    title: "Customized Dresser",
    views: "2.2M views",
    date: "2 years ago",
  },
  {
    id: 8,
    src: "./images/videos/thumbnails/4.png",
    user: " Michael Lee",
    title: "Macrame Curtain Tie",
    views: "1.8M views",
  },
  {
    id: 9,
    src: "./images/videos/thumbnails/1.png",
    user: "alexandra smith",
    title: "Lotus Pop Up Card",
    views: "1.5M views",
    date: "2 days ago",
  },
  {
    id: 10,
    src: "./images/videos/thumbnails/2.png",
    user: "Alison Garcia",
    title: "Christmas Decoration",
    views: "2M views",
    date: "3 years ago",
  },
  {
    id: 11,
    src: "./images/videos/thumbnails/3.png",
    user: "James Fraser",
    title: "Customized Dresser",
    views: "2.2M views",
    date: "2 years ago",
  },
  {
    id: 12,
    src: "./images/videos/thumbnails/4.png",
    user: " Michael Lee",
    title: "Macrame Curtain Tie",
    views: "1.8M views",
  },
  {
    id: 13,
    src: "./images/videos/thumbnails/1.png",
    user: "alexandra smith",
    title: "Lotus Pop Up Card",
    views: "1.5M views",
    date: "2 days ago",
  },
  {
    id: 14,
    src: "./images/videos/thumbnails/2.png",
    user: "Alison Garcia",
    title: "Christmas Decoration",
    views: "2M views",
    date: "3 years ago",
  },
  {
    id: 15,
    src: "./images/videos/thumbnails/3.png",
    user: "James Fraser",
    title: "Customized Dresser",
    views: "2.2M views",
    date: "2 years ago",
  },
  {
    id: 16,
    src: "./images/videos/thumbnails/4.png",
    user: " Michael Lee",
    title: "Macrame Curtain Tie",
    views: "1.8M views",
  },
];

export default function VideoGalleryPage() {
  return (
    <>
      <Searchbar />
      <main className="video__gallery ">
        <h2 className="section__title">Trending Now</h2>
        <div className="grid grid__3-cols">
          {videoData.map((v) => (
            <Video
              key={v.id}
              id={v.id}
              src={v.src}
              user={v.user}
              title={v.title}
              views={v.views}
              date={v.date}
            />
          ))}
        </div>
      </main>
    </>
  );
}
