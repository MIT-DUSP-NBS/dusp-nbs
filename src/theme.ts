import { MantineColorsTuple, createTheme } from '@mantine/core';

const lightBlue: MantineColorsTuple = [
  '#e0fbff',
  '#cbf2ff',
  '#9ae2ff',
  '#64d2ff',
  '#3cc5fe',
  '#23bcfe',
  '#09b8ff',
  '#00a1e4',
  '#0090cd',
  '#007cb5',
];

const dark: MantineColorsTuple = [
  '#C1C2C5',
  '#A6A7AB',
  '#909296',
  '#5c5f66',
  '#373A40',
  '#2C2E33',
  '#25262b',
  '#1A1B1E',
  '#141517',
  '#101113',
];

export const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: 'light-blue',
  colors: {
    'light-blue': lightBlue,
    dark,
  },
});
