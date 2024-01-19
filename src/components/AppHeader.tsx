import { Link, useParams } from 'react-router-dom';
import { RouteParams } from '../Routes';

function AppHeader() {
  const { username, reponame } = useParams<RouteParams>();
  return (
    <header>
      <p>
        {username && (
          <>
            <Link to="/">Início</Link>
            {' / '}
            {reponame ? <Link to={`/${username}`}>{username}</Link> : username}
          </>
        )}
        {reponame && <> / {reponame}</>}
      </p>
    </header>
  );
}

export default AppHeader;
