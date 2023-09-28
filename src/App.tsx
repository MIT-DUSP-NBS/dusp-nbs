import Header from './components/Header';
import Overview from './pages/Overview';
import SpatialAllocation from './pages/SpatialAllocation';
import Visualization from './pages/Visualization';
import About from './pages/About';
import Error from './components/Error';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={import.meta.env.BASE_URL + '/'} element={<Overview />} />
        <Route
          path={import.meta.env.BASE_URL + 'spatial-allocation'}
          element={<SpatialAllocation />}
        />
        <Route path={import.meta.env.BASE_URL + 'about'} element={<About />} />
        <Route
          path={import.meta.env.BASE_URL + 'visualization'}
          element={<Visualization />}
        />
        <Route path={'*'} element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
