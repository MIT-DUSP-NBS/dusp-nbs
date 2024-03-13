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
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';

import ThemeToggle from '../components/ThemeToggle';
import classes from './Header.module.css';

interface linksType {
  id: number;
  link: string | ((params?: { alignment?: 'start' | 'end' | 'center' }) => void);
  label: string;
}

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
    <Button component="a" variant={link.type} href={link.link} target="_blank" key={link.id}>
      {link.label}
    </Button>
  ));
}

function HeaderButton() {
  const scrollTo = useWindowScroll()[1];

  return (
    <Button variant="transparent" onClick={() => scrollTo({ y: 0 })}>
      Nature-Based Solutions Dashboard
    </Button>
  );
}

function Header({ links }: { links: linksType[] }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        background: 'var(--mantine-color-body)',
      }}
    >
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <HeaderButton />

          <Group h="100%" gap={0} visibleFrom="sm">
            <LinksRender links={links} />
          </Group>

          <Group visibleFrom="sm">
            <HeaderButtons />
            <ThemeToggle />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<HeaderButton />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="md">
          <Divider my="sm" />
          <LinksRender onClick={closeDrawer} links={links} />
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <HeaderButtons />
            <ThemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Header;
