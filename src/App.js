import './App.css';
import { Container } from '@material-ui/core'
import Main from './pages/Main';
import { SnackbarProvider } from 'notistack';
import { DrawerProvider } from './contexts/drawer.context';
import {CategoryProvider} from './contexts/category.context'
import { PostProvider } from './contexts/posts.context';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { UserProvider } from './contexts/user.context';
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ffffff'
    }
  },
});

function App() {
  

  return (
    <SnackbarProvider maxSnack={3}>
    <MuiThemeProvider theme={theme}>
      <Container maxWidth={false} style={{ padding: 0, height: '100vh' }}>
        <DrawerProvider>
        <CategoryProvider>
          <UserProvider>
            <PostProvider>
              <Main />
            </PostProvider>
          </UserProvider>
          </CategoryProvider>
        </DrawerProvider>
      </Container>
    </MuiThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
