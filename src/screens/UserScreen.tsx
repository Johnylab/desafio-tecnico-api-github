import { useContext, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import type { RouteParams } from '../Routes.tsx';
import UserProfile from '../components/User/UserProfile.tsx';
import UserRepos from '../components/User/UserRepos.tsx';
import { GlobalContext } from '../context/GlobalContext';

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
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
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
