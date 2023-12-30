import { Text, SimpleGrid, Container, rem, Image, Box } from '@mantine/core';
import {
  IconBuildingEstate,
  IconAdjustmentsSearch,
  IconGlobe,
  TablerIconsProps,
} from '@tabler/icons-react';
import urbanGreenAreasImg from '../assets/urbangreenareas.jpg';
import classes from './SpatialAllocation.module.css';

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<TablerIconsProps>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon style={{ width: rem(38), height: rem(38) }} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const data = [
  {
    icon: IconBuildingEstate,
    title: '5 types of NbS selected',
    description:
      'Green infrastructure (GI), street trees & green pavements, urban green spaces & agriculture, habitat preservation & remediation, and green buildings',
  },
  {
    icon: IconAdjustmentsSearch,
    title: 'Spatially allocated based on 3 factors',
    description:
      'Sectoral carbon emission, potential NbS benefits, and the local context of each location',
  },
  {
    icon: IconGlobe,
    title: 'Practical principles and criteria chosen',
    description:
      'Selected NbS and their implementation area were developed using optimal benefits by type and location.',
  },
];

function SpatialAllocation() {
  const items = data.map((item) => <Feature {...item} key={item.title} />);

  return (
    <div id="spatial-allocation">
      <Box w="full" mx="auto" style={{ position: 'relative' }}>
        <Image src={urbanGreenAreasImg} />
        <Text style={{ position: 'absolute', top: '8px', left: '8px' }}>test</Text>
      </Box>
      <Container mt={30} mb={30} size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          {items}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default SpatialAllocation;
