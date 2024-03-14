import { useScrollIntoView } from '@mantine/hooks';

import SpatialAllocation from './sections/SpatialAllocation/SpatialAllocation';
import Visualization from './sections/Visualization/Visualization';
import ReadResearch from './sections/ReadResearch/ReadResearch';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Hero from './sections/Hero/Hero';
import Features from './sections/Features/Features';

function Router() {
  const scrollOverview = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const scrollSpatialAllocation = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const scrollVisualization = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const scrollFooter = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const links = [
    { id: 0, link: scrollOverview.scrollIntoView, label: 'Overview' },
    { id: 1, link: scrollSpatialAllocation.scrollIntoView, label: 'Spatial Allocation' },
    { id: 2, link: scrollVisualization.scrollIntoView, label: 'Visualization' },
    { id: 3, link: scrollFooter.scrollIntoView, label: 'About' },
  ];

  return (
    <>
      <Header links={links} />
      <Hero />
      <Features ref={scrollOverview.targetRef} />
      <SpatialAllocation ref={scrollSpatialAllocation.targetRef} />
      <Visualization ref={scrollVisualization.targetRef} />
      <ReadResearch ref={scrollFooter.targetRef} />
      <Footer />
    </>
  );
}

export default Router;
