import { useContext, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RepoDetails from '../components/Repo/RepoDetails';
import RepoDetailsPlaceholder from '../components/Repo/RepoDetailsPlaceholder';
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
    return (
      <Container className="py-3 mb-auto">
        <p>{userData.message}</p>
      </Container>
    );
  }

  if (!userData.login) {
    return (
      <Container className="py-3 mb-auto">
        <RepoDetailsPlaceholder />
      </Container>
    );
  }

  if (!repo) {
    return (
      <Container className="py-3 mb-auto">
        <h1>Ops!</h1>

        <p>Repositório não encontrado. Tente uma das sugestões a seguir:</p>

        <ul>
          {userData.repos?.map((repo) => (
            <li key={repo.id}>
              <a href={`/${userData.login}/${repo.name}`}>{repo.name}</a>
            </li>
          ))}
        </ul>
      </Container>
    );
  }

  return (
    <Container className="py-3 mb-auto">
      <RepoDetails repo={repo} />
    </Container>
  );
}

export default RepoScreen;
