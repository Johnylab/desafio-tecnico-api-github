import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import type { RouteParams } from '../Routes.tsx';
import UserProfile from '../components/User/UserProfile.tsx';
import UserProfilePlaceholder from '../components/User/UserProfilePlaceholder.tsx';
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
