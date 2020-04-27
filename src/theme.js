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
  },
});

export default theme;
