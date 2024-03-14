import { ElementType } from 'react';
import { Text, Image, Box, HoverCard, Group, ThemeIcon } from '@mantine/core';
import { IconBuilding, IconTree, IconTrees, IconPlant, IconLeaf } from '@tabler/icons-react';
import basemapImg from '../assets/basemap.png';

const nbsDescriptions: {
  Icon: ElementType;
  title: string;
  description: string;
  posTop: string | number;
  posLeft: string | number;
}[] = [
  {
    Icon: IconTree,
    title: 'Tree',
    description:
      'Trees absorb carbon dioxide from the air, so planting more on streets offsets vehicle emissions. They also provide shade, encouraging walking and cycling.',
    posTop: '80%',
    posLeft: '20%',
  },
  {
    Icon: IconBuilding,
    title: 'Urban Green Area',
    description:
      'Green spaces like parks and gardens reduce the amount of sunlight absorbed by paved surfaces, lowering overall heat levels in urban areas (mitigate the urban heat island effect)',
    posTop: '60%',
    posLeft: '65%',
  },
  {
    Icon: IconLeaf,
    title: 'Green Belt',
    description:
      'Planting cover crops and restoring degraded land helps store carbon underground instead of releasing it into the atmosphere',
    posTop: '22%',
    posLeft: '80%',
  },
  {
    Icon: IconPlant,
    title: 'Green Roofs',
    description:
      'Green roofs help reduce the need for energy-intensive air conditioning. This means fewer greenhouse gases are emitted from homes and offices',

    posTop: '40%',
    posLeft: '78%',
  },
  {
    Icon: IconTrees,
    title: 'GBI',
    description:
      'Forests and water are valuable natural resources in cities. They store carbon in plants and aquatic environments, counteracting climate change caused by human activities like burning fossil fuels and deforestation.',
    posTop: '18%',
    posLeft: '20%',
  },
];

function EmissionsImage() {
  return (
    <>
      <Box w="90%" mx="auto" style={{ position: 'relative' }}>
        <Image src={basemapImg} radius="md" />
        {/* TODO: SHRINK IMAGE */}
        {/* TODO: REORGANIZE INTO ARRAY MAP */}
        {nbsDescriptions.map((NBS) => (
          <Group
            style={{ position: 'absolute', top: NBS.posTop, left: NBS.posLeft }}
            key={NBS.title}
          >
            <HoverCard withArrow shadow="md" width={280}>
              <HoverCard.Target>
                <ThemeIcon radius="xl" size="xl">
                  <NBS.Icon style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="lg" fw={700}>
                  {NBS.title}
                </Text>
                <Text size="sm">{NBS.description}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        ))}
      </Box>
    </>
  );
}

export default EmissionsImage;
