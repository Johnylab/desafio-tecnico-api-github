import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

type RepositorySortOption = {
  repoSortKey: 'stargazers_count' | 'watchers_count' | 'forks';
  repoOrder: 'desc' | 'asc';
};

const reportSortOptions = [
  { value: 'stargazers_count:desc', label: 'Mais estrelas' },
  { value: 'stargazers_count:asc', label: 'Menos estrelas' },
  { value: 'watchers_count:desc', label: 'Mais observadores' },
  { value: 'watchers_count:asc', label: 'Menos observadores' },
  { value: 'forks:desc', label: 'Mais forks' },
  { value: 'forks:asc', label: 'Menos forks' },
];

function UserScreen() {
  const { username } = useParams<{ username: string }>();
  const { userData, loadUserData } = useContext(GlobalContext);
  const [{ repoSortKey, repoOrder }, setRepoSort] =
    useState<RepositorySortOption>({
      repoSortKey: 'stargazers_count',
      repoOrder: 'desc',
    });
  const repos = useMemo(() => {
    if (!userData.repos) {
      return [];
    }

    if (!(repoSortKey in userData.repos[0])) {
      throw new Error('Invalid repoSortKey');
    }

    return userData.repos.sort((a, b) => {
      if (repoOrder === 'desc') {
        return b[repoSortKey] - a[repoSortKey];
      }

      return a[repoSortKey] - b[repoSortKey];
    });
  }, [repoOrder, repoSortKey, userData.repos]);

  function handleRepoSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const [_key, _order] = event.target.value.split(':');

    setRepoSort({
      repoSortKey: _key,
      repoOrder: _order,
    } as RepositorySortOption);
  }

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

  return (
    <div>
      <h1>{userData.name || userData.login}</h1>
      <img src={userData.avatar_url} alt={userData.name} width={90} />
      <p>
        {userData.type} {userData.company}{' '}
        <a href={userData.html_url} target="_blank" rel="noreferrer">
          @{userData.login}
        </a>
      </p>
      <p>{userData.location}</p>
      <p>{userData.bio}</p>
      <p>Seguidores: {userData.followers}</p>
      <p>Seguindo: {userData.following}</p>

      <h2>Repositórios</h2>
      <p>{userData.name || userData.login}</p>

      <select onChange={handleRepoSort} value={`${repoSortKey}:${repoOrder}`}>
        {reportSortOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <p>
              <Link to={`/${userData.login}/${repo.name}`}>{repo.name}</Link>
            </p>
            <p>
              {repo.language} ☆ {repo.stargazers_count} 👁️ {repo.watchers_count}{' '}
              ⑂ {repo.forks}
            </p>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserScreen;
