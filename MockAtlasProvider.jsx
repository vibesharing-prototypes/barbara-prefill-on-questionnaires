import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Mock Atlas theme for demo purposes
const mockAtlasTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export function MockAtlasThemeProvider({ children }) {
  return (
    <ThemeProvider theme={mockAtlasTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
