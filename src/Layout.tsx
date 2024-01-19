import { Outlet } from 'react-router-dom';
import AppHeader from './components/AppHeader';

function Layout() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default Layout;
