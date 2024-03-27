import { ForwardedRef, forwardRef } from 'react';
import { Title, Text, Grid, Button } from '@mantine/core';
import classes from './Features.module.css';
import FeatureCarousel from '../../components/FeatureCarousel';

const Features = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => (
  <div className={classes.wrapper} ref={ref}>
    <Grid gutter={80} maw="98%" justify="center">
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Title className={classes.title} order={2}>
          Work with nature to find solutions
        </Title>
        <Text c="dimmed">
          In addition to exploring bold technical visions, we can work with nature to tackle
          environmental problems. Nature-based solutions incorporate natural features and processes
          to protect the environment and support human wellbeing. For example, planting trees in
          cities, creating green spaces, restoring wetlands, and using natural materials in
          construction.
        </Text>

        <Button
          variant="gradient"
          gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
          size="lg"
          radius="md"
          mt="xl"
          component="a"
          href="https://naturebasedsolutions.org/"
        >
          Learn about NBS
        </Button>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 7 }}>
        <FeatureCarousel />
      </Grid.Col>
    </Grid>
  </div>
));
Features.displayName = 'Features';

export default Features;
