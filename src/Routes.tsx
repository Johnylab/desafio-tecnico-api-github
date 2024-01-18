import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import RepoScreen from './screens/RepoScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const router = createBrowserRouter([
  { path: '/', Component: HomeScreen },
  { path: '/:username', Component: UserProfileScreen },
  { path: '/:username/:reponame', Component: RepoScreen },
  { path: '*', Component: NotFoundScreen },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
