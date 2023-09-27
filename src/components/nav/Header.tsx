import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

function LinksRender() {
  const links = [
    { link: '', label: 'Overview' },
    { link: 'spatial-allocation', label: 'NbS Spatial Allocation' },
    { link: 'implementation', label: 'Implementation Visualization' },
    { link: 'interactive', label: 'Interactive NbS Planning' },
    { link: 'about', label: 'About the Tool' },
  ];

  return links.map((link) => (
    <a href={import.meta.env.BASE_URL + link.link} className={classes.link}>
      {link.label}
    </a>
  ));
}

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <p>Nature Based Solutions Dashboard</p>

          <Group h="100%" gap={0} visibleFrom="sm">
            <LinksRender />
          </Group>

          <Group visibleFrom="sm">
            <Button
              component="a"
              variant="default"
              href="https://github.com/dtemkin1/dusp-nbs"
            >
              View Github
            </Button>
            <Button
              component="a"
              href="https://doi.org/10.1038/s41558-023-01737-x"
            >
              Read Research Paper
            </Button>
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
            <Button
              component="a"
              variant="default"
              href="https://github.com/dtemkin1/dusp-nbs"
            >
              View Github
            </Button>
            <Button
              component="a"
              href="https://doi.org/10.1038/s41558-023-01737-x"
            >
              Read Research Paper
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
