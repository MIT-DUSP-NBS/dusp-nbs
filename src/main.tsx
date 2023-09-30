import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';

import '@mantine/core/styles.css';

const myColor: MantineColorsTuple = [
  '#e5f4ff',
  '#cde2ff',
  '#9bc2ff',
  '#64a0ff',
  '#3984fe',
  '#1d72fe',
  '#0969ff',
  '#0058e4',
  '#004ecc',
  '#0043b5',
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </React.StrictMode>
);
