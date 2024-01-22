import { useContext, useMemo } from 'react';
import { Breadcrumb, Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../Routes';
import logo from '../assets/img/logo.png';
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
    <header className="p-4 app-header">
      <Container>
        <Breadcrumb listProps={{ className: 'm-0 d-flex align-items-center' }}>
          <Breadcrumb.Item active>
            <Image src={logo} alt="Buscador de repositórios" height={28} />
          </Breadcrumb.Item>

          {username ? (
            <Breadcrumb.Item href="/">INÍCIO</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item active>OCTOBUSCA</Breadcrumb.Item>
          )}

          {username && !reponame && (
            <Breadcrumb.Item active>{userLabel}</Breadcrumb.Item>
          )}

          {reponame && (
            <>
              <Breadcrumb.Item href={`/${username}`}>
                {userLabel}
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
