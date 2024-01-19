import { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function RepoScreen() {
  const { username, reponame } = useParams();
  const { userData, loadUserData } = useContext(GlobalContext);
  const repo = useMemo(() => {
    if (!userData.repos) {
      return null;
    }

    return userData.repos.find((repo) => repo.name === reponame);
  }, [userData.repos, reponame]);

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

  if (!repo) {
    return <p>Repositório não encontrado</p>;
  }

  return (
    <div>
      <h1>{reponame}</h1>
      <p>{username}</p>

      <table>
        {Object.entries(repo).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{`${value}`}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default RepoScreen;
