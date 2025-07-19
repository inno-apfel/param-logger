import { Navbar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"

const LandingPage = () => {
  return (
    <div className="">
      <Navbar variant='landing'/>
      <HeroSection/>
    </div>
  );
};

export default LandingPage;