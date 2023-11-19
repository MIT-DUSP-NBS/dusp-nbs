import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Space } from '@mantine/core';

import Overview from './pages/Overview';
import SpatialAllocation from './pages/SpatialAllocation';
import Visualization from './pages/Visualization';
import About from './pages/About';
import Error from './pages/Error';
import Header from './components/Header';

function Layout() {
  return (
    <>
      <Header />
      <Space h="calc(3.75rem * var(--mantine-scale))" />
      <Outlet />
    </>
  );
}

const router = createHashRouter(
  [
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Overview />,
        },
        {
          path: 'spatial-allocation',
          element: <SpatialAllocation />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'visualization',
          element: <Visualization />,
        },
      ],
    },
  ]
  // { basename: '/dusp-nbs' }
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
