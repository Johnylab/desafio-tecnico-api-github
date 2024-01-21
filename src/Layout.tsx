import { Outlet } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';

function Layout() {
  return (
    <AppContainer>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </AppContainer>
  );
}

export default Layout;
