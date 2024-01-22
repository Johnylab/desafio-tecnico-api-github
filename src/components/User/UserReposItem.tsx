import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Diagram2, Eye, Star } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import type { Repository } from '../../github/types';
import Pluralize from '../Pluralize';

type UserReposItemProps = {
  repo: Repository;
};

function UserReposItem({ repo }: UserReposItemProps) {
  return (
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
  );
}

export default UserReposItem;
