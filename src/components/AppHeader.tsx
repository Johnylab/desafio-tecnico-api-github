import { useContext, useMemo } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { RouteParams } from '../Routes';
import { GlobalContext } from '../context/GlobalContext';

function AppHeader() {
  const { username, reponame } = useParams<RouteParams>();
  const { userData } = useContext(GlobalContext);

  const userLabel = useMemo(() => {
    if (userData.login) {
      return userData.name || userData.login;
    }

    return username;
  }, [username, userData.name, userData.login]);

  const repoLabel = useMemo(() => {
    const _repo = userData.repos?.find((repo) => repo.name === reponame);

    if (_repo) {
      return _repo.name;
    }

    return reponame;
  }, [reponame, userData.repos]);

  return (
    <header className="bg-dark-subtle p-4">
      <Container>
        <Breadcrumb listProps={{ className: 'm-0' }}>
          {username ? (
            <Breadcrumb.Item>
              <Link to="/">Início</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item active>Início</Breadcrumb.Item>
          )}
          {username && !reponame && (
            <Breadcrumb.Item active>{userLabel}</Breadcrumb.Item>
          )}
          {reponame && (
            <>
              <Breadcrumb.Item>
                <Link to={`/${username}`}>{userLabel}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{repoLabel}</Breadcrumb.Item>
            </>
          )}
        </Breadcrumb>
      </Container>
    </header>
  );
}

export default AppHeader;
