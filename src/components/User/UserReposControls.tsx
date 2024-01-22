import type { ChangeEvent } from 'react';
import {
  Col,
  FloatingLabel,
  FormControl,
  FormSelect,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { Search, SortDown } from 'react-bootstrap-icons';

type UserReposControlsProps = {
  filter: string;
  setFilter: (filter: string) => void;
  repoSortKey: 'stargazers_count' | 'watchers_count' | 'forks';
  repoOrder: 'desc' | 'asc';
  setRepoSort: (sort: SortOption) => void;
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

function UserReposControls({
  filter,
  setFilter,
  repoSortKey,
  repoOrder,
  setRepoSort,
}: UserReposControlsProps) {
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
    <Row className="my-3">
      <Col sm={8}>
        <InputGroup>
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <FloatingLabel
            controlId="filter"
            label="Filtrar por nome, descrição ou linguagem"
          >
            <FormControl
              type="text"
              placeholder="Sua busca aqui"
              value={filter}
              onInput={handleFilterChange}
            />
          </FloatingLabel>
        </InputGroup>
      </Col>

      <Col sm={4}>
        <InputGroup>
          <InputGroup.Text>
            <SortDown />
          </InputGroup.Text>
          <FloatingLabel controlId="sort" label="Ordenar por">
            <FormSelect
              onChange={handleRepoSort}
              value={`${repoSortKey}:${repoOrder}`}
            >
              {selectSortOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </FormSelect>
          </FloatingLabel>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default UserReposControls;

export type { SortOption };
