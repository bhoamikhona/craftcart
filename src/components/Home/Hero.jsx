import "./Hero.css";
import Link from "next/link.js";

export default function Hero() {
  return (
    <section className="section__hero">
      <div className="hero">
        <div className="hero__text-box">
          <h1 className="h1 hero__heading">
            Creativity starts here — discover, learn, and shop beautifully
            curated crafts
          </h1>
          <p className="hero__description">
            From expert-led tutorials to unique handmade pieces, CraftCart turns
            inspiration into reality. Explore a refined world of creativity
            designed for makers, learners, and dreamers.
          </p>
          <Link href="/" className="btn btn--full margin-right-sm">
            Start crafting now
          </Link>
          <Link href="/" className="btn btn--outline">
            Learn More &darr;
          </Link>
        </div>
        <div className="hero__img-container">
          <img
            className="hero__img"
            src="./images/home/Hero.png"
            alt="hero-img"
          />
        </div>
      </div>
    </section>
  );
}
