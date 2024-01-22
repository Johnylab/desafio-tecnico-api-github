import { Outlet } from 'react-router-dom';
import AppContainer from './components/Layout/AppContainer';
import AppFooter from './components/Layout/AppFooter';
import AppHeader from './components/Layout/AppHeader';

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
