import { Container, Text, Button, Group } from '@mantine/core';
import { IconArticle, IconMapSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Hero.module.css';

function Hero() {
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          Urban areas contribute more than{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            60%
          </Text>{' '}
          of global greenhouse emissions
        </h1>

        <Text className={classes.description} color="dimmed">
          Nature-based solutions (NbS) are increasingly being adopted by cities worldwide to enhance
          carbon sequestration, offsets emissions, and promotes sustainable land management
          practices, thus contributing to global climate change mitigation efforts.
        </Text>

        <Group className={classes.controls}>
          <Link to="visualization">
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              leftSection={<IconMapSearch size={20} />}
            >
              View solutions
            </Button>
          </Link>

          <Button
            component="a"
            href="https://doi.org/10.1038/s41558-023-01737-x"
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
  );
}

export default Hero;
