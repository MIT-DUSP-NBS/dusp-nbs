import Header from './components/Header';
import Overview from './pages/Overview';
import SpatialAllocation from './pages/SpatialAllocation';
import Visualization from './pages/Visualization';
import About from './pages/About';
import Error from './components/Error';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="spatial-allocation" element={<SpatialAllocation />} />
        <Route path="about" element={<About />} />
        <Route path="visualization" element={<Visualization />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
