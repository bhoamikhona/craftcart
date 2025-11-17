import { FaRegHeart } from "react-icons/fa";
import { SiFuturelearn } from "react-icons/si";
import { LuLeaf } from "react-icons/lu";
import "./Features.css";

const featuresData = [
  {
    icon: <FaRegHeart />,
    title: "Handcrafted With Love",
    description:
      "Every product on CraftCart is made by real creators who pour passion, skill, and artistry into every piece.",
  },
  {
    icon: <SiFuturelearn />,
    title: "Learn From Real Creators",
    description:
      "Enjoy easy, step-by-step tutorials designed to teach you real skills — from beginner to advanced.",
  },
  {
    icon: <LuLeaf />,
    title: "Sustainable & Ethical",
    description:
      "We support small creators who use mindful materials and ethical production methods.",
  },
];

export default function Features() {
  return (
    <section className="section__features ">
      <h2 className="section__title">What makes craftcart special</h2>
      <div className="grid grid__3-cols">
        {featuresData.map((f) => (
          <Feature
            key={f.title}
            icon={f.icon}
            title={f.title}
            description={f.description}
          />
        ))}
      </div>
    </section>
  );
}

function Feature({ icon, title, description }) {
  return (
    <article className="feature">
      <div className="feature__icon-container">
        <span className="feature__icon">{icon}</span>
      </div>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__description">{description}</p>
    </article>
  );
}
