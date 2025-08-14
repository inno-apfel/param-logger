import { Navbar } from "@/components/nav-bar";
import { HeroSection } from "@/components/hero-section";

const LandingPage = () => {
  return (
    <div>
      <Navbar
        authenticatedPage={false}
        fontColor = 'text-black'
        bgAlwaysSolid={false}
        bgAlwaysWhite={true}
        scrollTransitionThreshold={0}
      />
      <HeroSection/>
    </div>
  );
};

export default LandingPage;