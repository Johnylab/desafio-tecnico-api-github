import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.tsx';
import HomeScreen from './screens/HomeScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import RepoScreen from './screens/RepoScreen';
import UserScreen from './screens/UserScreen';

type RouteParams = {
  username?: string;
  reponame?: string;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', Component: HomeScreen },
      { path: '/:username', Component: UserScreen },
      { path: '/:username/:reponame', Component: RepoScreen },
      { path: '*', Component: NotFoundScreen },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;

export type { RouteParams };
