import { useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function UserProfileScreen() {
  const { username } = useParams();
  const { userData, loadUserData } = useContext(GlobalContext);

  if (userData.login !== username) {
    loadUserData(username as string);
  }

  if (userData.error) {
    return <p>{userData.error}</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>{userData.name || userData.login}</p>
      <p>{userData.followers}</p>
      <p>{userData.following}</p>
      <p>{userData.public_repos}</p>
      <p>
        <Link to={`/${username}/repos`}>Repositórios</Link>
      </p>
    </div>
  );
}

export default UserProfileScreen;
