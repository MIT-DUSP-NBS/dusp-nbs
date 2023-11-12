import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Title, useMantineTheme, rem, Text } from '@mantine/core';
import classes from './FeatureCarousel.module.css';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
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
      {/* <Button variant="white" color="dark">
        Read article
      </Button> */}
    </Paper>
  );
}

const data = [
  {
    image:
      'https://urbangreenbluegrids.com/uploads/London-Wetland-Centre-Berkeley-Homes-1300x650.jpg',
    title: 'Urban Wetlands',
    category: 'urban',
  },
  {
    image:
      'https://environment-review.yale.edu/sites/default/files/styles/flexslider_full/public/8070749192_72b1af084c_o.jpg?itok=qyqFEbdT',
    title: 'Coastal Wetlands',
    category: 'beach',
  },
  {
    image:
      'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892272/EducationHub/photos/hoh-river-valley.jpg',
    title: 'Forests and Vegitation',
    category: 'nature',
  },
  {
    image:
      'https://www.noaa.gov/sites/default/files/styles/landscape_width_1275/public/legacy/image/2019/Jun/coral%20ecosystems%20reeffish.jpg?itok=zNvXr7Yz',
    title: 'Coral Reefs',
    category: 'ocean',
  },
  {
    image:
      'https://www.parker-kaufman.com/wp-content/uploads/2020/06/great-dunes-beach-park-jekyll-island.jpg',
    title: 'Dunes and Beaches',
    category: 'beach',
  },
  {
    image:
      'https://www.europenowjournal.org/wp-content/uploads/2021/04/Figure_2e_copyright_SLA_Photographer_Mikkel_Eye-2048x1463.jpg',
    title: 'Urban Green Space',
    category: 'urban',
  },
  {
    image:
      'https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/612db1fc-1371-428b-9378-142334407b09/Rendition/low-res/Content/Public',
    title: 'Inland Wetlands',
    category: 'nature',
  },
  {
    image:
      'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638882850/EducationHub/photos/yellow-river.jpg',
    title: 'Rivers and Floodplains',
    category: 'nature',
  },
  {
    image:
      'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_700,w_1050,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_1719030049_t0q0ps.jpg',
    title: 'Mangroves',
    category: 'nature',
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
