import SpatialAllocation from './sections/SpatialAllocation/SpatialAllocation';
import Visualization from './sections/Visualization/Visualization';
import ReadResearch from './sections/ReadResearch/ReadResearch';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Hero from './sections/Hero/Hero';
import Features from './sections/Features/Features';
import EmissionsImage from './sections/EmissionsImage/EmissionsImage';

function Router() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <EmissionsImage />
      <SpatialAllocation />
      <Visualization />
      <ReadResearch />
      <Footer />
    </>
  );
}

export default Router;
