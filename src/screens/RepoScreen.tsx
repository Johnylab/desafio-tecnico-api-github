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
      <h1>{repo.name}</h1>
      <p>
        @{repo.full_name}{' '}
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          Ver no GitHub
        </a>
      </p>
      {repo.homepage && (
        <p>
          <a href={repo.homepage} target="_blank" rel="noreferrer">
            {repo.homepage}
          </a>
        </p>
      )}
      <p>{repo.description}</p>
      <p>
        Licença:{' '}
        {repo.license ? (
          <a href={repo.license.url} target="_blank" rel="noreferrer">
            {repo.license.name}
          </a>
        ) : (
          'Nenhuma'
        )}
      </p>
      <p>Estrelas: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks}</p>
      <p>Observadores: {repo.watchers_count}</p>
      <p>Issues: {repo.open_issues_count}</p>

      <p>Linguagem: {repo.language}</p>
      <p>Tópicos:</p>
      <ul>
        {repo.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}

export default RepoScreen;
