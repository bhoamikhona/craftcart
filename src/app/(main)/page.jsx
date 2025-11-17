import Hero from "@/components/Home/Hero/Hero.jsx";
import Features from "@/components/Home/Features/Features.jsx";
import Testimonials from "@/components/Home/Testimonials/Testimonials.jsx";
import Videos from "@/components/Home/Videos/Videos.jsx";
import Products from "@/components/Home/Products/Products.jsx";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <Videos />
      <Products />
    </div>
  );
}
