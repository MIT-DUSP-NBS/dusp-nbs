import { Title, Text, Grid, Button } from '@mantine/core';
import classes from './Features.module.css';
import FeatureCarousel from '../../components/FeatureCarousel';

function Features() {
  return (
    <div className={classes.wrapper}>
      <Grid gutter={80} maw="98%" justify="center">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            What are Nature-based Solutions?
          </Title>
          <Text c="dimmed">
            Instead of relying only on technology, we can work with nature to find solutions. For
            example, planting trees in cities, creating green spaces, restoring wetlands, and using
            natural materials in construction are all ways of using nature to help tackle
            environmental problems.
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
            Learn more
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <FeatureCarousel />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Features;
