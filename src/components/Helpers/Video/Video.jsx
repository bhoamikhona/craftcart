import Link from "next/link.js";
import "./Video.css";

export default function Video({ id, src, user, title, views, date }) {
  return (
    <article className="video">
      <div className="video__container">
        <img src={src} alt={title} className="video__thumbnail" />
      </div>
      <div className="video__details">
        <Link href={`/videos/${id}`} className="video__link">
          <h3 className="video__title">{title}</h3>
        </Link>
        <p className="video__user">{user}</p>
        <p className="video__stats">
          {views} • {date}
        </p>
      </div>
    </article>
  );
}
