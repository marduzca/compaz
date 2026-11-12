import { createTheme } from '@mui/material/styles';

// Literal values mirror the tokens in src/variables.css and src/index.css, as MUI needs concrete colours to derive its palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#4794ff',
      dark: '#004BA0',
      contrastText: '#ffffff',
    },
  },
  typography: { fontFamily: 'inherit' },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: 'var(--content-border-radius)',
          '&::before, &::after': { display: 'none' },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { color: '#313131' } },
    },
  },
});

export default theme;
