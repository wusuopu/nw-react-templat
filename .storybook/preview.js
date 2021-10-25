import React from 'react';
import { ThemeProvider } from 'styled-components';
import StoryRouter from 'storybook-react-router';
import { withKnobs } from '@storybook/addon-knobs';
import theme from '../src/theme'

export const decorators = [
  withKnobs,
  StoryRouter(),
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
