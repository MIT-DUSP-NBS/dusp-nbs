import { Container, Table, Button, ScrollArea, HoverCard, Text, Title, List } from '@mantine/core';

const infrastructure = [
  {
    id: 0,
    name: 'Street trees',
    criteria: 'High transport emissions AND High population density',
  },
  {
    id: 1,
    name: 'Green buildings',
    criteria: '(High residential emission OR High industry emission) AND Building rooftops',
    moreInfo: {
      title: 'Available land cover for GI',
      description:
        'Fairly broad category that includes parks, forests, wetlands, bioswales, permeable pavements, green corridors, and other natural or nature-based elements',
      listElems: [
        '13400 Land without current use',
        '14100 Green urban areas',
        '23000 Pastures',
        '31000 Forests',
        '32000 Herbaceous vegetation associations (natural grassland, moors...)',
        '40000 Wetland',
      ],
    },
  },
  {
    id: 2,
    name: 'Green infrastructure',
    criteria: '(High residential emissions OR High industrial emissions) AND Available land cover',
  },
  {
    id: 3,
    name: 'Urban green areas',
    criteria: '(High population density OR High built-up areas) AND Available land cover',
    moreInfo: {
      title: 'Available land cover for Urban green areas',
      description: '',
      listElems: [
        '11230 Discontinuous Low-Density Urban Fabric (S.L.: 10% – 30%)',
        '11240 Discontinuous Very Low-Density Urban Fabric (S.L.: < 10%)',
        '14100 Green urban areas',
      ],
    },
  },
  {
    id: 4,
    name: 'Greenbelts',
    criteria: 'Low population density AND Existing preserved areas',
  },
];

const keyvars = [
  {
    id: 0,
    type: 'Emissions',
    description: 'CO2 emissions by sector',
    data_source: 'Global Carbon Grid',
    year: 2019,
    available: 'http://gidmodel.org.cn/?page_id=1425',
  },
  {
    id: 1,
    type: 'Residential development',
    description: 'Urban fabric density',
    data_source: 'Urban Atlas via Copernicus',
    year: 2018,
    available: 'https://land.copernicus.eu/local/urban-atlas/urban-atlas-2018',
  },
  {
    id: 2,
    type: 'Population',
    description: 'Population per cell',
    data_source: 'Global Carbon Grid',
    year: 2019,
    available:
      'https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/population-distribution-demography/geostat',
  },
  {
    id: 3,
    type: 'Building density',
    description: 'Urban fabric density classifications',
    data_source: 'Urban Atlas via Copernicus',
    year: 2018,
    available: 'https://land.copernicus.eu/local/urban-atlas/urban-atlas-2018',
  },
  {
    id: 4,
    type: 'Transportation',
    description: 'Roadway network with classification and speed',
    data_source: 'OpenStreet Map',
    year: 2017,
    available: 'https://www.openstreetmap.org/#map=5/62.994/17.637',
  },
  {
    id: 5,
    type: 'Industry',
    description: 'Industrial, commercial, public, military and private units',
    data_source: 'Urban Atlas via Copernicus',
    year: 2018,
    available: 'https://land.copernicus.eu/local/urban-atlas/urban-atlas-2018',
  },
  {
    id: 6,
    type: 'City boundaries',
    description: 'Functional urban area boundaries',
    data_source: 'European Commission',
    year: 2015,
    available: 'https://data.jrc.ec.europa.eu/dataset/jrc-luisa-ui-boundaries-fua',
  },
];

function About() {
  const infrastructure_rows = infrastructure.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>
        {element.moreInfo ? (
          <HoverCard width={320} shadow="md">
            <HoverCard.Target>
              <Text size="sm">{element.criteria}</Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Title size={20}>{element.moreInfo.title}</Title>
              <Text size="sm">{element.moreInfo.description}</Text>
              <List size="sm">
                {element.moreInfo.listElems.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          element.criteria
        )}
      </Table.Td>
    </Table.Tr>
  ));

  const keyvars_rows = keyvars.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{element.data_source}</Table.Td>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>
        <Button component="a" variant="subtle" href={element.available} target="_blank">
          Click here!
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <ScrollArea.Autosize mah="calc(100vh - 3.75rem * var(--mantine-scale))" maw="100%">
      <Container>
        <Table captionSide="bottom">
          <Table.Caption>
            <Button
              component="a"
              variant="subtle"
              href="https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/population-distribution-demography/geostat"
              target="_blank"
            >
              Click here to view typology!
            </Button>
          </Table.Caption>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Infrastructure</Table.Th>
              <Table.Th>Criteria (Hover for more info)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{infrastructure_rows}</Table.Tbody>
        </Table>

        <Table captionSide="bottom">
          <Table.Caption>Key variables and data sources used in the analysis</Table.Caption>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Type</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Data Source</Table.Th>
              <Table.Th>Year</Table.Th>
              <Table.Th>Available</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{keyvars_rows}</Table.Tbody>
        </Table>
      </Container>
    </ScrollArea.Autosize>
  );
}

export default About;
