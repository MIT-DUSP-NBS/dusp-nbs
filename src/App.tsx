import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';

import Router from './Router';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Router />
    </MantineProvider>
  );
}

export default App;
