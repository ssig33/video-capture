import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { lime, amber } from '@material-ui/core/colors';

export const MyTheme = ({ children }) => {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const theme = darkMode
    ? createMuiTheme({
        palette: { type: 'dark', primary: lime, secondary: amber },
      })
    : createMuiTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
