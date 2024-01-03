import {
  Text,
  SimpleGrid,
  Container,
  rem,
  Image,
  Box,
  HoverCard,
  Group,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBuildingEstate,
  IconAdjustmentsSearch,
  IconGlobe,
  IconBuilding,
  IconTrees,
  TablerIconsProps,
} from '@tabler/icons-react';
import basemapImg from '../assets/basemap.jpg';
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
        <Image src={basemapImg} />
        <Group style={{ position: 'absolute', top: '45%', left: '23%' }}>
          <HoverCard withArrow shadow="md">
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconBuilding style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">Urban Green Area</Text>
              {/* TODO: ADD DESCRIPTION */}
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Group style={{ position: 'absolute', top: '60%', left: '35%' }}>
          <HoverCard withArrow shadow="md">
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconTrees style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">Green Roofs</Text>
              {/* TODO: ADD DESCRIPTION */}
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
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
