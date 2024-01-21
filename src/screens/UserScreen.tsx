import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from '../Routes.tsx';
import UserProfile from '../components/User/UserProfile.tsx';
import UserRepos from '../components/User/UserRepos.tsx';
import { GlobalContext } from '../context/GlobalContext';
import { Container } from 'react-bootstrap';

function UserScreen() {
  const { username } = useParams<RouteParams>();
  const { userData, loadUserData } = useContext(GlobalContext);

  // Refresh context data when navigation occurs
  useEffect(() => {
    loadUserData(username as string);
  }, [username, loadUserData]);

  if (userData.message) {
    return (
      <Container>
        <p>{userData.message}</p>
      </Container>
    );
  }

  if (!userData.login) {
    return (
      <Container>
        <p>Carregando...</p>
      </Container>
    );
  }

  return (
    <>
      <UserProfile data={userData} />
      <UserRepos items={userData.repos || []} />
    </>
  );
}

export default UserScreen;
