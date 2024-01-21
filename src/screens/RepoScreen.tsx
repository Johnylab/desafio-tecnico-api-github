import { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import RepoDetails from '../components/Repo/RepoDetails';
import { GlobalContext } from '../context/GlobalContext';
import { Container, Spinner } from 'react-bootstrap';

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

  if (!repo) {
    return (
      <Container>
        <p>Repositório não encontrado</p>
      </Container>
    );
  }

  return <RepoDetails repo={repo} />;
}

export default RepoScreen;
