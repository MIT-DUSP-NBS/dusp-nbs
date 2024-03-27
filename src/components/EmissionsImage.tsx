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
    title: 'Trees',
    description:
      'Increase tree cover in cities. Plan and implement urban tree conservation, maintenance, and planting activities.',
    posTop: '80%',
    posLeft: '20%',
  },
  {
    Icon: IconBuilding,
    title: 'Green Spaces',
    description:
      'Mandate green space allocation in city planning, create permeable surfaces, convert vacant lots to community gardens, parks and green areas.',
    posTop: '60%',
    posLeft: '65%',
  },
  {
    Icon: IconLeaf,
    title: 'Greenbelt',
    description:
      'Implement reforestation and afforestation programs to enhance green belt vegetation',
    posTop: '22%',
    posLeft: '80%',
  },
  {
    Icon: IconPlant,
    title: 'Green Roofs',
    description:
      'Promote building energy efficiency, incorporate green roofs and vertical gardens into building facades design',
    posTop: '40%',
    posLeft: '78%',
  },
  {
    Icon: IconTrees,
    title: 'Green and Blue Infrastructure (GBI)',
    description:
      'Restore and protect natural water bodies, wetlands, and riparian zones, establish green corridors, develop recreational trails and amenities to promote public access.',
    posTop: '18%',
    posLeft: '20%',
  },
];

function EmissionsImage() {
  return (
    <>
      <Box w="90%" mx="auto" style={{ position: 'relative' }}>
        <Image
          src={basemapImg}
          radius="md"
          alt="A generated view of the nature-based solutions implementations"
        />
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
