import { Title, Text, Grid, Button } from '@mantine/core';
import classes from './Features.module.css';
import FeatureCarousel from './FeatureCarousel';

export function Features() {
  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            So what can we do?
          </Title>
          <Text c="dimmed">
            Realistic NbS implementation plans toward carbon neutrality (such as restoring natural
            ecosystems and increasing urban green resources) need to be both effective in mitigating
            carbon emissions at the global level and suitable for the socio-economic and physical
            conditions at the local level. Prioritizing suitable sites and solutions can enhance the
            long-term viability of NbS. Successful adoption of NbS and realization of their
            functionality requires a holistic and collaborative planning approach that incorporates
            stakeholders across scales and disciplines. This platform aims to serve as a point of
            departure to facilitate the identifying suitable interventions and enhancing the
            awareness of NbS opportunities in urban settings.
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            component="a"
            href="https://www.worldbank.org/en/topic/disasterriskmanagement/brief/nature-based-solutions-cost-effective-approach-for-disaster-risk-and-water-resource-management"
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
