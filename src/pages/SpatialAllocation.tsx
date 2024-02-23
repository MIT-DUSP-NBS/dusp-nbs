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
  Title,
} from '@mantine/core';
import {
  IconBuildingEstate,
  IconAdjustmentsSearch,
  IconGlobe,
  IconBuilding,
  IconTree,
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
    title: 'Consider Urban Contex',
    description:
      'Consider factors such as land availability, existing green spaces, biodiversity hotspots, and proximity to sources of carbon emissions like highways or industrial zones.',
  },
  {
    icon: IconAdjustmentsSearch,
    title: 'Prioritize High-Impact Areas',
    description:
      'Prioritize areas with high potential for carbon reduction, such as neighborhoods with dense populations or high vehicular traffic.',
  },
  {
    icon: IconGlobe,
    title: 'Prioritize high-impact NbS types',
    description:
      'Focus on solutions that are well-suited to urban settings and can be effectively implemented within the constraints of limited space, infrastructure, and resources.',
  },
];

function SpatialAllocation() {
  const items = data.map((item) => <Feature {...item} key={item.title} />);

  return (
    <div id="spatial-allocation">
      <Title style={{ paddingBottom: '10px' }}>
        {/* TODO: MAKE STYLE BETTER */}
        How Nature-based Solutions reduce carbon emissions
      </Title>
      <Box w="full" mx="auto" style={{ position: 'relative' }}>
        <Image src={basemapImg} />
        {/* TODO: SHRINK IMAGE */}
        {/* TODO: REORGANIZE INTO ARRAY MAP */}
        <Group style={{ position: 'absolute', top: '50%', left: '75%' }}>
          <HoverCard withArrow shadow="md" width={280}>
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconTree style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="lg" fw={700}>
                Tree
              </Text>
              <Text size="sm">
                Trees absorb carbon dioxide from the air, so planting more on streets offsets
                vehicle emissions. They also provide shade, encouraging walking and cycling.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Group style={{ position: 'absolute', top: '45%', left: '23%' }}>
          <HoverCard withArrow shadow="md" width={280}>
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconBuilding style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="lg" fw={700}>
                Urban Green Area
              </Text>
              <Text size="sm">
                Green spaces like parks and gardens reduce the amount of sunlight absorbed by paved
                surfaces, lowering overall heat levels in urban areas (mitigate the urban heat
                island effect)
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Group style={{ position: 'absolute', top: '60%', left: '35%' }}>
          <HoverCard withArrow shadow="md" width={280}>
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconTrees style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="lg" fw={700}>
                Green Roofs
              </Text>
              <Text size="sm">
                Green roofs help reduce the need for energy-intensive air conditioning. This means
                fewer greenhouse gases are emitted from homes and offices
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Box>
      <Container mt={30} mb={30} size="lg">
        <Title style={{ paddingBottom: '10px' }}>
          {/* TODO: MAKE STYLE BETTER */}
          How to locate NbS to maximize their carbon-reduction potential
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          {items}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default SpatialAllocation;
