import Landing from "./hero-section";
import Footer from "./footer";
import HeroSection from "./hero-section";
export default function LandingMain() {
  return (
    <main className={`overflow-hidden  w-full`}>
      <Landing />
      <HeroSection />
      <Footer />
    </main>
  );
}
