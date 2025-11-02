import Navbar from '../../components/Navbar/Navbar.js';
import HeroWithImageBackground from '../../components/HeroWithImageBackground/HeroWithImageBackground.js';
import HomeCardSection from '../../components/HomeCardSection/HomeCardSection.js';
import CountDiseaseSection from '../../components/CountDiseaseSection/CountDiseaseSection.js';
import SliderSection from '../../components/SliderSection/SliderSection.js';
import Footer from '../../components/Footer/Footer.js';


const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-pink-50">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <HeroWithImageBackground />

      {/* Informative Cards */}
      <HomeCardSection />

      {/* Count Statistics Section (already styled well) */}
      <CountDiseaseSection />

      {/* Testimonial/Slider Section */}
      <SliderSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
