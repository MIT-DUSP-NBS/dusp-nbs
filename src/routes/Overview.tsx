import overview from '../assets/overview.png';
import overview_nbs from '../assets/overview_nbs.png';
import { Container, Image } from '@mantine/core';

function Overview() {
  return (
    <Container>
      <h1>Overview</h1>
      <h2>Urban Challenges</h2>
      <p>
        Urban areas contribute more than 60% of global greenhouse gas (GHG)
        emissions, through residential, commercial, and transportation
        activities. Nature-based solutions (NbS) are increasingly being adopted
        by cities worldwide to enhance carbon sequestration, offsets emissions,
        and promotes sustainable land management practices, thus contributing to
        global climate change mitigation efforts.
      </p>
      <h2>Nature-based Solutions</h2>
      <p>
        Realistic NbS implementation plans toward carbon neutrality, such as
        restoring natural ecosystems and increasing urban green resources, need
        to be both effective in mitigating carbon emissions at the global level
        and suitable for the socio-economic and physical conditions at the local
        level. Prioritizing suitable sites and solutions can enhance the
        long-term viability of NbS. In our research,we have explored a
        systematic approach to spatially prioritizing different types of NbS
        implementations in multiple major EU cities.
      </p>
      <Image src={overview} />
      <h2>Motivation</h2>
      <p>
        The motivation for developing this tool is to offer the necessary
        flexibility for NbS planning, by enabling users to interact and iterate
        through our spatial allocation processes. Successful adoption of NbS and
        realization of their functionality requires a holistic and collaborative
        planning approach that incorporates stakeholders across scales and
        disciplines. This platform aims to serve as a point of departure to
        facilitate the identifying suitable interventions and enhancing the
        awareness of NbS opportunities in urban settings.
      </p>
      <Image src={overview_nbs} />
    </Container>
  );
}

export default Overview;
