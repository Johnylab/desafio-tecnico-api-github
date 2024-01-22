import { useMemo, useState } from 'react';
import { FormText } from 'react-bootstrap';
import type { Repository } from '../../github/types';
import { searchByKeys, sortByKey } from '../../utils/array';
import Pluralize from '../utils/Pluralize';
import type { SortOption } from './UserReposControls';
import UserReposControls from './UserReposControls';
import UserReposItem from './UserReposItem';

type UserReposProps = {
  items: Repository[];
};

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

  return (
    <>
      <h2>Repositórios</h2>

      <UserReposControls
        filter={filter}
        setFilter={setFilter}
        repoSortKey={repoSortKey}
        repoOrder={repoOrder}
        setRepoSort={setRepoSort}
      />

      <Pluralize
        count={filteredItems.length}
        render={({ $, count }) =>
          filter ? (
            <FormText>
              Exibindo {count} {$('item', 'itens')} de {items.length}
            </FormText>
          ) : (
            <FormText>
              Total: {count} {$('repositório')}
            </FormText>
          )
        }
        fallback={<FormText>Nenhum repositório encontrado</FormText>}
      />

      {repos.map((repo) => (
        <UserReposItem key={repo.id} repo={repo} />
      ))}
    </>
  );
}

export default UserRepos;
