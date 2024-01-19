import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from '../Routes.tsx';
import UserProfile from '../components/UserProfile';
import UserRepos from '../components/UserRepos.tsx';
import { GlobalContext } from '../context/GlobalContext';

function UserScreen() {
  const { username } = useParams<RouteParams>();
  const { userData, loadUserData } = useContext(GlobalContext);

  // Refresh context data when navigation occurs
  useEffect(() => {
    loadUserData(username as string);
  }, [username, loadUserData]);

  if (userData.message) {
    return <p>{userData.message}</p>;
  }

  if (!userData.login) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <UserProfile data={userData} />
      <UserRepos items={userData.repos || []} />
    </>
  );
}

export default UserScreen;
