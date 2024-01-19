import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Repository } from '../github/api';
import { searchByKeys, sortByKey } from '../utils/array';
import Pluralize from './Pluralize';

type UserReposProps = {
  items: Repository[];
};

type SortOption = {
  repoSortKey: 'stargazers_count' | 'watchers_count' | 'forks';
  repoOrder: 'desc' | 'asc';
};

const selectSortOptions = [
  { value: 'stargazers_count:desc', label: 'Mais estrelas' },
  { value: 'stargazers_count:asc', label: 'Menos estrelas' },
  { value: 'watchers_count:desc', label: 'Mais observadores' },
  { value: 'watchers_count:asc', label: 'Menos observadores' },
  { value: 'forks:desc', label: 'Mais forks' },
  { value: 'forks:asc', label: 'Menos forks' },
];

function UserRepos({ items }: UserReposProps) {
  const [filter, setFilter] = useState('');
  const [{ repoSortKey, repoOrder }, setRepoSort] = useState<SortOption>({
    repoSortKey: 'stargazers_count',
    repoOrder: 'desc',
  });

  const filteredItems = useMemo(() => {
    return searchByKeys(items, ['name', 'description', 'language'], filter);
  }, [items, filter]);

  const repos = useMemo(
    () => sortByKey(filteredItems, repoSortKey, repoOrder === 'asc'),
    [filteredItems, repoOrder, repoSortKey]
  );

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  function handleRepoSort(event: ChangeEvent<HTMLSelectElement>) {
    const [_key, _order] = event.target.value.split(':');

    setRepoSort({
      repoSortKey: _key,
      repoOrder: _order,
    } as SortOption);
  }

  return (
    <div>
      <h2>Repositórios</h2>

      <input
        type="text"
        placeholder="Filtrar repositórios"
        value={filter}
        onInput={handleFilterChange}
      />

      <select onChange={handleRepoSort} value={`${repoSortKey}:${repoOrder}`}>
        {selectSortOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <Pluralize
        count={filteredItems.length}
        render={({ $, count }) =>
          filter ? (
            <p>
              Exibindo {count} {$('item', 'itens')} de {items.length}
            </p>
          ) : (
            <p>
              Total: {count} {$('repositório')}
            </p>
          )
        }
      />

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <p>
              <Link to={`/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
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

export default UserRepos;
