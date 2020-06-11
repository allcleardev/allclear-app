import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007AFF',
    },
    secondary: {
      main: '#002C83',
    },
    accent: {
      main: '#11BCF1',
    },
    error: {
      main: '#E82727',
    },
    background: {
      default: '#fff',
    },
    gradient: {
      mobile: 'linear-gradient(157.73deg, #007cff 0%, #002c83 117.55%)',
      desktop: 'linear-gradient(159.42deg, #007cff 1.48%, #002c83 172.68%)',
    },
  },
  typography: {
    fontFamily: ['Heebo', 'sans-serif'].join(','),
    body2: {
      letterSpacing: '.032em',
    },
    button: {
      textTransform: 'none',
      lineHeight: '1.47em',
      letterSpacing: '.032em',
    },
  },
});

export default theme;
