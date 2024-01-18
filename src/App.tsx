import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext.tsx';
import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/UserProfileScreen.tsx';
import UserReposScreen from './screens/UserReposScreen';

const router = createBrowserRouter([
  { path: '/', Component: HomeScreen },
  {
    path: '/:username',
    children: [
      { index: true, Component: UserProfileScreen },
      { path: 'repos', Component: UserReposScreen },
    ],
  },
]);

function App() {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
}

export default App;
