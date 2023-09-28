import nbs_1 from '../assets/nbs_1.png';
import nbs_2 from '../assets/nbs_2.png';
import { Container, Image } from '@mantine/core';

function Overview() {
  return (
    <Container>
      <h1>NbS Spatial Allocation</h1>
      <p>
        We selected five types of NbS (green infrastructure (GI), street trees "
        & green pavements, urban green spaces & agriculture, habitat
        preservation & remediation, and green buildings) as our study
        objectives. From established definitions of NbS in the literature, we
        identified the level of benefit of different types of NbS at different
        urban settings and synthesized quantitative indicators to describe the
        impact of NbS on sectoral carbon emissions.
      </p>
      <Image src={nbs_1} />
      <p>
        The NbS implementations were spatially allocated based on three major "
        factors: the sectoral carbon emission, potential NbS benefits, and the
        local context of each location. For example, street trees & green
        pavements as an NbS to promote walking and cycling should ideally be
        located along city roads in high-density urban areas, while preserved
        habitats should be located at the urban fringe where new urban
        developments are likely to occur. We have developed practical principles
        and criteria that systematically guide the spatial allocations of each
        type of NbS.
      </p>
      <Image src={nbs_2} />
    </Container>
  );
}

export default Overview;
