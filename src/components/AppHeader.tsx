import { useContext, useMemo } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { RouteParams } from '../Routes';
import { GlobalContext } from '../context/GlobalContext';

function AppHeader() {
  const { username: _username, reponame: _reponame } = useParams<RouteParams>();
  const { userData } = useContext(GlobalContext);

  const username = useMemo(() => {
    if (userData.login) {
      return userData.name || userData.login;
    }

    return _username;
  }, [_username, userData.name, userData.login]);

  const reponame = useMemo(() => {
    const _repo = userData.repos?.find((repo) => repo.name === _reponame);

    if (_repo) {
      return _repo.name;
    }

    return _reponame;
  }, [_reponame, userData.repos]);

  return (
    <Container as="header">
      <Breadcrumb>
        {username && (
          <Breadcrumb.Item>
            <Link to="/">Início</Link>
          </Breadcrumb.Item>
        )}

        {reponame ? (
          <Breadcrumb.Item>
            <Link to={`/${username}`}>{username}</Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item active>{username}</Breadcrumb.Item>
        )}

        {reponame && <Breadcrumb.Item active>{reponame}</Breadcrumb.Item>}
      </Breadcrumb>
    </Container>
  );
}

export default AppHeader;
