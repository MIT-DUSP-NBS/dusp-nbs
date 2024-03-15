import { ForwardedRef, forwardRef } from 'react';
import { Container, Text, Button, Group } from '@mantine/core';
import { IconArticle, IconMapSearch } from '@tabler/icons-react';
import classes from './Hero.module.css';

const Hero = forwardRef(
  ({ scrollLink }: { scrollLink: () => void }, ref: ForwardedRef<HTMLDivElement>) => (
    <div className={classes.wrapper} ref={ref}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          Urban areas contribute more than{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            60%
          </Text>{' '}
          of global greenhouse emissions
        </h1>

        <Text className={classes.description} c="dimmed">
          Nature-based solutions offer a sustainable and cost-effective way to mitigate urban
          greenhouse gas emissions while also providing other benefits like improving air quality,
          enhancing biodiversity, and creating more livable cities for people.
        </Text>

        <Group className={classes.controls}>
          <Button
            onClick={scrollLink}
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            leftSection={<IconMapSearch size={20} />}
          >
            View solutions
          </Button>

          <Button
            component="a"
            href="https://doi.org/10.1038/s41558-023-01737-x"
            target="_blank"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<IconArticle size={20} />}
          >
            Read research
          </Button>
        </Group>
      </Container>
    </div>
  )
);
Hero.displayName = 'Hero';

export default Hero;
