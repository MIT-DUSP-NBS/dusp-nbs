import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Text,
  rem,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

function LinksRender() {
  const links = [
    { id: 0, link: '', label: 'Overview' },
    { id: 1, link: 'spatial-allocation', label: 'Spatial Allocation' },
    { id: 2, link: 'visualization', label: 'Visualization' },
    { id: 3, link: 'about', label: 'About' },
  ];

  return links.map((link) => (
    <Link
      to={import.meta.env.BASE_URL + link.link}
      className={classes.link}
      key={link.id}
    >
      {link.label}
    </Link>
  ));
}

function HeaderButtons() {
  const buttons_list = [
    {
      id: 0,
      link: 'https://github.com/dtemkin1/dusp-nbs',
      label: 'Github',
      type: 'default',
    },
    {
      id: 1,
      link: 'https://doi.org/10.1038/s41558-023-01737-x',
      label: 'Research Paper',
      type: 'filled',
    },
  ];

  return buttons_list.map((link) => (
    <Button
      component="a"
      variant={link.type}
      href={link.link}
      target="_blank"
      key={link.id}
    >
      {link.label}
    </Button>
  ));
}

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text>Nature Based Solutions Dashboard</Text>

          <Group h="100%" gap={0} visibleFrom="sm">
            <LinksRender />
          </Group>

          <Group visibleFrom="sm">
            <HeaderButtons />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Nature-Based Solutions Dashboard"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <LinksRender />
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <HeaderButtons />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
