import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import {
  Badge,
  Card,
  Col,
  Container,
  FloatingLabel,
  FormControl,
  FormSelect,
  FormText,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Diagram2, Eye, Search, SortDown, Star } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import type { Repository } from '../../github/types';
import { searchByKeys, sortByKey } from '../../utils/array';
import Pluralize from '../Pluralize';

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
    <Container>
      <h2>Repositórios</h2>

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
        <Card key={repo.id} className="my-3">
          <Card.Header>
            <Link
              to={`/${repo.owner.login}/${repo.name}`}
              className="link-underline-light"
            >
              {repo.name}
            </Link>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <p className="align-items-center gx-2 mb-3">
                  {repo.language ? (
                    <Badge pill>{repo.language}</Badge>
                  ) : (
                    <small className="text-body-tertiary">
                      Linguagem desconhecida
                    </small>
                  )}
                </p>

                <p>{repo.description}</p>
              </Col>
              <Col sm={5}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row className="align-items-center gx-2">
                      <Col className="flex-grow-0">
                        <Star />
                      </Col>
                      <Col>
                        <Pluralize
                          count={repo.stargazers_count}
                          render={({ count, $ }) => (
                            <>
                              {count} <small>{$('estrela')}</small>
                            </>
                          )}
                          fallback={
                            <small className="text-body-tertiary">
                              Nenhuma estrela
                            </small>
                          }
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className="align-items-center gx-2">
                      <Col className="flex-grow-0">
                        <Eye />
                      </Col>
                      <Col>
                        <Pluralize
                          count={repo.watchers_count}
                          render={({ count, $ }) => (
                            <>
                              {count}{' '}
                              <small>{$('observador', 'observadores')}</small>
                            </>
                          )}
                          fallback={
                            <small className="text-body-tertiary">
                              Nenhum observador
                            </small>
                          }
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className="align-items-center gx-2">
                      <Col className="flex-grow-0">
                        <Diagram2 />
                      </Col>
                      <Col>
                        <Pluralize
                          count={repo.forks}
                          render={({ count, $ }) => (
                            <>
                              {count} <small>{$('fork')}</small>
                            </>
                          )}
                          fallback={
                            <small className="text-body-tertiary">
                              Nenhum fork
                            </small>
                          }
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default UserRepos;
