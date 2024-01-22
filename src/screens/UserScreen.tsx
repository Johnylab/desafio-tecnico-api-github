import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import type { RouteParams } from '../Routes.tsx';
import UserProfile from '../components/User/UserProfile.tsx';
import UserProfilePlaceholder from '../components/User/UserProfilePlaceholder.tsx';
import UserRepos from '../components/User/UserRepos.tsx';
import { GlobalContext } from '../context/GlobalContext';
import { userStorage } from '../github/localStorage.ts';

function UserScreen() {
  const { username } = useParams<RouteParams>();
  const { userData, loadUserData } = useContext(GlobalContext);

  // Refresh context data when navigation occurs
  useEffect(() => {
    loadUserData(username as string);
  }, [username, loadUserData]);

  if (userData.message) {
    const searchHistory = userStorage.getAllItems();

    return (
      <Container className="py-3 mb-auto">
        <h1>Ops!</h1>
        <p>{userData.message}</p>

        {searchHistory.length > 0 && (
          <>
            <p>Últimas buscas:</p>

            <ul>
              {searchHistory.map((item) => (
                <li key={item.login}>
                  <a href={`/${item.login}`}>{item.name || item.login}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    );
  }

  if (!userData.login) {
    return (
      <Container className="py-3 mb-auto">
        <UserProfilePlaceholder />
      </Container>
    );
  }

  return (
    <>
      <Container className="py-3">
        <UserProfile data={userData} />
      </Container>
      <Container className="py-3 mb-auto">
        <UserRepos items={userData.repos || []} />
      </Container>
    </>
  );
}

export default UserScreen;
