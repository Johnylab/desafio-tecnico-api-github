import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function UserScreen() {
  const { username } = useParams<{ username: string }>();
  const { userData, loadUserData } = useContext(GlobalContext);

  useEffect(() => {
    if (username) {
      loadUserData(username);
    }
  }, [username, loadUserData]);

  if (userData.message) {
    return <p>{userData.message}</p>;
  }

  if (!userData.login) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{userData.name || userData.login}</h1>
      <img src={userData.avatar_url} alt={userData.name} width={90} />
      <p>
        {userData.type} {userData.company}{' '}
        <a href={userData.html_url} target="_blank" rel="noreferrer">
          @{userData.login}
        </a>
      </p>
      <p>{userData.location}</p>
      <p>{userData.bio}</p>
      <p>Seguidores: {userData.followers}</p>
      <p>Seguindo: {userData.following}</p>

      <h2>Repositórios</h2>
      <p>{userData.name || userData.login}</p>

      <select>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>

      <ul>
        {userData.repos?.map((repo) => (
          <li key={repo.id}>
            <Link to={`/${userData.login}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserScreen;
