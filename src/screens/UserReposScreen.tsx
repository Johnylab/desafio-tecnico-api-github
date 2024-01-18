import { useContext } from 'react';
import { Navigate, useParams } from 'react-router';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function UserReposScreen() {
  const { username } = useParams();
  const { userData, loadUserData } = useContext(GlobalContext);

  if (userData.login !== username) {
    loadUserData(username as string);
  }

  if (userData.error) {
    return <Navigate to={`/${username}`} replace />;
  }

  return (
    <div>
      <h1>User Repos</h1>
      <p>{userData.name || userData.login}</p>

      <ul>
        {userData.repos?.map((repo) => (
          <li key={repo.id}>
            <Link to={`/${username}/repos/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReposScreen;
