import { useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import {
  Paper,
  Box,
  Title,
  useMantineTheme,
  rem,
  Text,
  Button,
  Transition,
  ActionIcon,
  useComputedColorScheme,
} from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import classes from './FeatureCarousel.module.css';

interface CardProps {
  image: string;
  title: string;
  category: string;
  description: string;
}

function Card({ image, title, category, description }: CardProps) {
  const [opened, setOpened] = useState(false);
  const computedColorScheme = useComputedColorScheme();

  return (
    <Box pos="relative">
      <Paper
        p="xl"
        radius="md"
        withBorder
        style={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <Button variant="white" color="dark" onClick={() => setOpened(!opened)}>
          View Information
        </Button>
      </Paper>
      <Transition mounted={opened} transition="fade" duration={400} timingFunction="ease">
        {(styles) => (
          <Paper
            p="xl"
            radius="md"
            pos="absolute"
            withBorder
            top={0}
            left={0}
            right={0}
            style={{
              ...styles,
              zIndex: 1,
              backgroundColor:
                computedColorScheme === 'light'
                  ? 'var(--mantine-color-white)'
                  : 'var(--mantine-color-dark-8)',
            }}
            className={classes.card}
          >
            <div>
              <Text className={classes.categoryDescription} size="xs">
                {category}
              </Text>
              <Title order={3} className={classes.titleDescription}>
                {title}
              </Title>
            </div>
            <Text size="md">{description}</Text>
            <ActionIcon
              variant="transparent"
              size="xl"
              aria-label="Return"
              onClick={() => setOpened(!opened)}
            >
              <IconArrowBack style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Paper>
        )}
      </Transition>
    </Box>
  );
}

const data: CardProps[] = [
  {
    image:
      'https://urbangreenbluegrids.com/uploads/London-Wetland-Centre-Berkeley-Homes-1300x650.jpg',
    title: 'Urban Wetlands',
    category: 'urban',
    description: '',
  },
  {
    image:
      'https://environment-review.yale.edu/sites/default/files/styles/flexslider_full/public/8070749192_72b1af084c_o.jpg?itok=qyqFEbdT',
    title: 'Coastal Wetlands',
    category: 'beach',
    description: '',
  },
  {
    image:
      'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892272/EducationHub/photos/hoh-river-valley.jpg',
    title: 'Forests and Vegitation',
    category: 'nature',
    description: '',
  },
  {
    image:
      'https://www.noaa.gov/sites/default/files/styles/landscape_width_1275/public/legacy/image/2019/Jun/coral%20ecosystems%20reeffish.jpg?itok=zNvXr7Yz',
    title: 'Coral Reefs',
    category: 'ocean',
    description: '',
  },
  {
    image:
      'https://www.parker-kaufman.com/wp-content/uploads/2020/06/great-dunes-beach-park-jekyll-island.jpg',
    title: 'Dunes and Beaches',
    category: 'beach',
    description: '',
  },
  {
    image:
      'https://www.europenowjournal.org/wp-content/uploads/2021/04/Figure_2e_copyright_SLA_Photographer_Mikkel_Eye-2048x1463.jpg',
    title: 'Urban Green Space',
    category: 'urban',
    description: '',
  },
  {
    image:
      'https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/612db1fc-1371-428b-9378-142334407b09/Rendition/low-res/Content/Public',
    title: 'Inland Wetlands',
    category: 'nature',
    description: '',
  },
  {
    image:
      'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638882850/EducationHub/photos/yellow-river.jpg',
    title: 'Rivers and Floodplains',
    category: 'nature',
    description: '',
  },
  {
    image:
      'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_700,w_1050,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_1719030049_t0q0ps.jpg',
    title: 'Mangroves',
    category: 'nature',
    description: '',
  },
];

function FeatureCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: rem(2), sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}

export default FeatureCarousel;
