import { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import RepoDetails from '../components/RepoDetails';
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

  return <RepoDetails repo={repo} />;
}

export default RepoScreen;
