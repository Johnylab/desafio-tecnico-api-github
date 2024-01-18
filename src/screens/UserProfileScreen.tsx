import { useContext, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function UserProfileScreen() {
  const { username } = useParams<{ username: string }>();
  const { userData, loadUserData } = useContext(GlobalContext);
  const isUserLoaded = !!userData.login || !!userData.message;

  useEffect(() => {
    if (username && !isUserLoaded) {
      loadUserData(username);
    }
  }, [username, isUserLoaded, loadUserData]);

  if (!username) {
    return <Navigate to="/" replace />;
  }

  if (userData.message) {
    return <p>{userData.message}</p>;
  }

  if (!userData.login) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{userData.name || userData.login}</h1>
      <p>{userData.followers}</p>
      <p>{userData.following}</p>
      <p>{userData.public_repos}</p>

      <h2>Repositórios</h2>
      <p>{userData.name || userData.login}</p>

      <select>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>

      <ul>
        {userData.repos?.map((repo) => (
          <li key={repo.id}>
            <Link to={`/${userData.login}/${repo.name}`}>{repo.name}</Link>{' '}
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              ver no GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfileScreen;
