import { Text, Image, Box, HoverCard, Group, ThemeIcon, Title } from '@mantine/core';
import { IconBuilding, IconTree, IconTrees } from '@tabler/icons-react';
import basemapImg from '../../assets/basemap.jpg';

function EmissionsImage() {
  return (
    <>
      <Title style={{ paddingBottom: '10px' }}>
        {/* TODO: MAKE STYLE BETTER */}
        How Nature-based Solutions reduce carbon emissions
      </Title>
      <Box w="full" mx="auto" style={{ position: 'relative' }}>
        <Image src={basemapImg} />
        {/* TODO: SHRINK IMAGE */}
        {/* TODO: REORGANIZE INTO ARRAY MAP */}
        <Group style={{ position: 'absolute', top: '50%', left: '75%' }}>
          <HoverCard withArrow shadow="md" width={280}>
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconTree style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="lg" fw={700}>
                Tree
              </Text>
              <Text size="sm">
                Trees absorb carbon dioxide from the air, so planting more on streets offsets
                vehicle emissions. They also provide shade, encouraging walking and cycling.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Group style={{ position: 'absolute', top: '45%', left: '23%' }}>
          <HoverCard withArrow shadow="md" width={280}>
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconBuilding style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="lg" fw={700}>
                Urban Green Area
              </Text>
              <Text size="sm">
                Green spaces like parks and gardens reduce the amount of sunlight absorbed by paved
                surfaces, lowering overall heat levels in urban areas (mitigate the urban heat
                island effect)
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Group style={{ position: 'absolute', top: '60%', left: '35%' }}>
          <HoverCard withArrow shadow="md" width={280}>
            <HoverCard.Target>
              <ThemeIcon radius="xl" size="xl">
                <IconTrees style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="lg" fw={700}>
                Green Roofs
              </Text>
              <Text size="sm">
                Green roofs help reduce the need for energy-intensive air conditioning. This means
                fewer greenhouse gases are emitted from homes and offices
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Box>
    </>
  );
}

export default EmissionsImage;
