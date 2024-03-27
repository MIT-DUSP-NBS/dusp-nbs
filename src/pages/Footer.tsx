import { Container, Group, Anchor, Text } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Footer.module.css';

const links = [
  { link: 'https://github.com/dtemkin1/dusp-nbs', label: 'Github' },
  { link: 'mailto:dtemkin@mit.edu', label: 'Contact' },
  //   { link: '#', label: 'Privacy' },
  //   { link: '#', label: 'Blog' },
  //   { link: '#', label: 'Careers' },
];

function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>Nature Based Solutions-Dashboard</Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default Footer;
