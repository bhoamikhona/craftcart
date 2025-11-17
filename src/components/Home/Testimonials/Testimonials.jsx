import "./Testimonials.css";

export default function Testimonials() {
  return (
    <section className="section__testimonials">
      <div className="grid grid__3-cols">
        <div className="testimonials__img-container">
          <img
            className="testimonials__img"
            src="./images/testimonials/testimonial.jpg"
            alt="two girls crafting together"
          />
        </div>
        <div className="testimonials__container">
          <h2 className="testimonials__title">
            {`\"`}We never thought crafting could be this easy and fun!{`\"`}
          </h2>
          <blockquote className="testimonials__text">
            CraftCart’s tutorials helped us learn new skills we didn’t even know
            we needed. From candle making to simple home décor, we’ve created
            things we’re actually proud of! Such a warm and inspiring platform.
          </blockquote>
          <p className="testimonial-author">— Mary and Sarah Johnson</p>
        </div>
      </div>
    </section>
  );
}
