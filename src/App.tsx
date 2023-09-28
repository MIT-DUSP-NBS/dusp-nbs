import Header from './components/Header';
import Overview from './routes/Overview';
import SpatialAllocation from './routes/SpatialAllocation';
import Error from './components/Error';
import About from './routes/About';

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
        <Route path={'*'} element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
