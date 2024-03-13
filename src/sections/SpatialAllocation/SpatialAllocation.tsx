import { ForwardedRef, forwardRef } from 'react';

import { Text, SimpleGrid, Container, rem, Title } from '@mantine/core';
import {
  IconBuildingEstate,
  IconAdjustmentsSearch,
  IconGlobe,
  TablerIconsProps,
} from '@tabler/icons-react';
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

const SpatialAllocation = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => {
  const items = data.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg" ref={ref}>
      <Title style={{ paddingBottom: '10px' }}>
        {/* TODO: MAKE STYLE BETTER */}
        How to locate NbS to maximize their carbon-reduction potential
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
});
SpatialAllocation.displayName = 'SpatialAllocation';

export default SpatialAllocation;
