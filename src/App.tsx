import Header from './components/nav/Header';
import Overview from './routes/Overview';
import SpatialAllocation from './routes/SpatialAllocation';
import Error from './routes/Error';
import About from './routes/About';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Overview />,
      errorElement: <Error />,
    },
    {
      path: '/spatial-allocation',
      element: <SpatialAllocation />,
    },
    {
      path: '/about',
      element: <About />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
