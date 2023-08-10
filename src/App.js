import "./App.css";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      "Public Sans",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RoutesApp />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
