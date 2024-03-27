import { ForwardedRef, forwardRef } from 'react';
import { Grid, Stack, Title, Text, Image, Container, Space } from '@mantine/core';

import classes from './Comparison.module.css';

const data: {
  badPic: string;
  altBad: string;
  goodPic: string;
  altGood: string;
  header: string;
  description: string;
}[] = [
  {
    badPic:
      'https://static01.nyt.com/images/2023/09/10/nyregion/10big-kcbh/08big-kcbh-jumbo.jpg?quality=75&auto=webp',
    altBad: 'New York City traffic congestion',
    goodPic: 'https://pau.studio/wp-content/uploads/2021/04/200709_PAU_NYC_46St_AfterSt.jpg',
    altGood: 'A reimagined view of New York City with green spaces and bike lanes',
    header: 'Nudge pro-environmental behaviors',
    description:
      'Investing in trees and protected greenspaces along mobility corridors can offer a behavioral incentive, encouraging individuals to choose biking and walking along shaded, protected paths over driving cars on congested roads, thus contributing to carbon reduction efforts',
  },
  {
    badPic:
      'https://res.cloudinary.com/jll-am-cdn/images/f_auto,q_auto:eco/v1699513818/WPCOE/buildingengines.com/GettyImages-1310170601_2377375e58/GettyImages-1310170601_2377375e58.jpeg?_i=AA',
    altBad: 'A typical roof HVAC system',
    goodPic:
      'https://images.fastcompany.net/image/upload/w_1250,ar_16:9,c_fill,g_auto,f_auto,q_auto,fl_lossy/wp-cms/uploads/2019/10/p-1-90413645-why-donand8217t-all-buildings-have-green-roofs.webp',
    altGood: 'Roof green space',
    header: 'Improve energy use',
    description:
      'Green roof temperatures can be 30–40°F lower than those of conventional roofs. Using vegetated facades in built environments lowers air conditioning needs, reducing energy consumption and associated carbon emissions from power plants.',
  },
  {
    badPic:
      'https://johncornacchia.files.wordpress.com/2011/12/paving-paradise-globacorp-john-cornacchia-2.jpg',
    altBad: 'Empty parking lots and roads in a cityscape',
    goodPic: 'https://capshift.com/wp-content/uploads/2023/10/Central-Park-scaled.jpg',
    altGood: 'Central Park in New York City',
    header: 'Mitigate urban heat island effect',
    description:
      'Green spaces mitigate carbon emissions by reducing urban heat levels through decreased sunlight absorption. They also store carbon in plants and aquatic environments, aiding in carbon sequestration. This dual effect helps offset emissions and mitigate climate change impacts in urban environments.',
  },
];

const Comparison = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => (
  <Container fluid m="xl" ref={ref}>
    <Title className={classes.title}>Leverage NBS to Achieve Carbon-Neutral Cities</Title>
    <Space h="md" />

    {data.map((row) => (
      <div key={row.header}>
        <Grid gutter="sm" grow>
          <Grid.Col span={{ base: 12, sm: 6, lg: 3.5 }}>
            <Image
              src={row.badPic}
              style={{ aspectRatio: '16 / 9' }}
              radius="md"
              alt={row.altBad}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, lg: 3.5 }}>
            <Image
              src={row.goodPic}
              style={{ aspectRatio: '16 / 9' }}
              radius="md"
              alt={row.altGood}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Stack align="stretch" justify="center" h="80%" m="md">
              <Title className={classes.header}>{row.header}</Title>
              <Text className={classes.description}>{row.description}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Space h="xl" />
        <Space h="xl" />
      </div>
    ))}
  </Container>
));
Comparison.displayName = 'Comparison';

export default Comparison;
