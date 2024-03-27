import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Anchor,
  ActionIcon,
  em,
  Grid,
} from '@mantine/core';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { IconFileText } from '@tabler/icons-react';

import ThemeToggle from '../components/ThemeToggle';
import classes from './Header.module.css';

const breakpointSize = 'sm';

interface linksType {
  id: number;
  link: string | ((params?: { alignment?: 'start' | 'end' | 'center' }) => void);
  label: string;
}

const buttons_list = [
  // {
  //   id: 0,
  //   link: 'https://github.com/dtemkin1/dusp-nbs',
  //   label: 'Github',
  //   type: 'default',
  //   icon: IconBrandGithub,
  // },
  {
    id: 1,
    link: 'https://doi.org/10.1038/s41558-023-01737-x',
    label: 'Research Paper',
    type: 'filled',
    icon: IconFileText,
  },
];

function LinksRender({ onClick, links }: { onClick?: () => void; links: linksType[] }) {
  return links.map((link) =>
    typeof link.link === 'string' ? (
      <Anchor href={link.link} className={classes.link} key={link.id} onClick={onClick}>
        {link.label}
      </Anchor>
    ) : (
      <Anchor
        className={classes.link}
        key={link.id}
        onClick={() => {
          if (link.link && typeof link.link !== 'string') {
            link.link({
              // alignment: 'center',
            });
          }
          if (onClick) {
            onClick();
          }
        }}
      >
        {link.label}
      </Anchor>
    )
  );
}

function HeaderButtons({
  breakpointLarge,
  breakpointSmall,
}: {
  breakpointLarge?: boolean;
  breakpointSmall?: boolean;
}) {
  return buttons_list.map((link) =>
    !(!breakpointSmall && breakpointLarge) ? (
      <Button
        component="a"
        variant={link.type}
        href={link.link}
        target="_blank"
        key={link.id}
        leftSection={<link.icon stroke={1.5} />}
      >
        {link.label}
      </Button>
    ) : (
      <ActionIcon
        size="calc(2.25rem*var(--mantine-scale))"
        component="a"
        variant={link.type}
        href={link.link}
        target="_blank"
        key={link.id}
      >
        <link.icon stroke={1.5} />
      </ActionIcon>
    )
  );
}

function HeaderButton({
  breakpointLarge,
  breakpointSmall,
}: {
  breakpointLarge?: boolean;
  breakpointSmall?: boolean;
}) {
  const scrollTo = useWindowScroll()[1];

  return (
    <Button variant="transparent" onClick={() => scrollTo({ y: 0 })}>
      {!(!breakpointSmall && breakpointLarge)
        ? 'Nature-Based Solutions Dashboard'
        : 'NBS Dashboard'}
    </Button>
  );
}

function Header({ links }: { links: linksType[] }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const breakpointLarge = useMediaQuery(`(max-width: ${em(1200)})`);
  const breakpointSmall = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        background: 'var(--mantine-color-body)',
      }}
    >
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <HeaderButton breakpointLarge={breakpointLarge} breakpointSmall={breakpointSmall} />

          <Group h="100%" gap={0} visibleFrom={breakpointSize}>
            <LinksRender links={links} />
          </Group>

          <Group visibleFrom={breakpointSize}>
            <HeaderButtons breakpointLarge={breakpointLarge} breakpointSmall={breakpointSmall} />
            <ThemeToggle />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom={breakpointSize} />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<HeaderButton breakpointLarge={breakpointLarge} breakpointSmall={breakpointSmall} />}
        hiddenFrom={breakpointSize}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="md">
          <Divider my="sm" />
          <LinksRender onClick={closeDrawer} links={links} />
          <Divider my="sm" />

          <Grid justify="center" pb="xl" px="md">
            <Grid.Col span="auto">
              <Group grow>
                <HeaderButtons
                  breakpointLarge={breakpointLarge}
                  breakpointSmall={breakpointSmall}
                />
              </Group>
            </Grid.Col>
            <Grid.Col span="content">
              <ThemeToggle />
            </Grid.Col>
          </Grid>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
