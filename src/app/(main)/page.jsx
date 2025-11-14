import Container from "@/components/layout/Container.jsx";
import HeroSection from "@/components/home/HeroSection.jsx";
import FeaturesSection from "@/components/home/FeaturesSection.jsx";
import TutorialsCarousel from "@/components/home/TutorialsCarousel.jsx";
import MarketplaceCarousel from "@/components/home/MarketplaceCarousel.jsx";
import CallToActionStrip from "@/components/home/CallToActionStrip.jsx";

export default function Home() {
  // return (
  //   <div className="min-h-screen bg-background text-foreground">
  //     <section className="gradient-bg text-center text-white py-16">
  //       <h1 className="text-5xl font-bold">THEME TEST</h1>
  //       <p className="mt-4 text-lg">Light and Dark Mode work!</p>
  //       <button className="btn-primary mt-6">TEST BUTTON</button>
  //     </section>
  //   </div>
  // );
  return (
    <Container>
      {/* <h1 className="text-3xl font-bold text-primary">
        CraftCart Container Test
      </h1>
      <p>This text should be centered with padding on both sides.</p> */}

      <HeroSection />
      <FeaturesSection />
      <TutorialsCarousel />
      {/* <MarketplaceCarousel /> */}
      <CallToActionStrip />
    </Container>
  );
}
