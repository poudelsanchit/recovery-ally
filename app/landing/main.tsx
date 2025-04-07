import Footer from "./footer";
import HeroSection from "./hero-section";
import StatsSection from "./stats";
export default function LandingMain() {
  return (
    <main className={`overflow-hidden  w-full`}>
      <HeroSection />
      <StatsSection/>
      <Footer />
    </main>
  );
}
