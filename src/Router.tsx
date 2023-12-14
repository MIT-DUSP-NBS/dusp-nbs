import Overview from './pages/Overview';
import SpatialAllocation from './pages/SpatialAllocation';
import Visualization from './pages/Visualization';
import About from './pages/About';
import Header from './components/Header';
import Footer from './pages/Footer';

function Router() {
  return (
    <>
      <Header />
      <Overview />
      <SpatialAllocation />
      <Visualization />
      <About />
      <Footer />
    </>
  );
}

export default Router;
