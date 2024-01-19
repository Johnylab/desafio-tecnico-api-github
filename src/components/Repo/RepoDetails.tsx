import { Repository } from '../../github/api';

type RepoDetailsProps = {
  repo: Repository;
};

function RepoDetails({ repo }: RepoDetailsProps) {
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

export default RepoDetails;
