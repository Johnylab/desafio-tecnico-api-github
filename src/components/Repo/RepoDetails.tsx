import { Badge, Col, ListGroup, Row, Stack } from 'react-bootstrap';
import {
  BoxArrowUpRight,
  Diagram2,
  ExclamationSquare,
  Eye,
  Globe,
  Star,
} from 'react-bootstrap-icons';
import type { Repository } from '../../github/types';
import CountDisplay from '../CountDisplay';

type RepoDetailsProps = {
  repo: Repository;
};

function RepoDetails({ repo }: RepoDetailsProps) {
  return (
    <>
      <h1>{repo.name}</h1>
      <p>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          <Stack direction="horizontal" gap={1}>
            <span className="ms-auto">{repo.full_name}</span>
            <BoxArrowUpRight />
          </Stack>
        </a>
      </p>

      <p className="text-body-secondary">{repo.description}</p>

      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <CountDisplay
                className="gx-2"
                icon={Star}
                count={repo.stargazers_count}
                singular="estrela"
                fallback="Nenhuma estrela"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <CountDisplay
                className="gx-2"
                icon={Eye}
                count={repo.watchers_count}
                singular="observador"
                plural="observadores"
                fallback="Nenhum observador"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <CountDisplay
                className="gx-2"
                icon={Diagram2}
                count={repo.forks}
                singular="fork"
                fallback="Nenhum fork"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <CountDisplay
                className="gx-2"
                icon={ExclamationSquare}
                count={repo.open_issues_count}
                singular="issue"
                fallback="Nenhuma issue"
              />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <p>Licença: {repo.license ? repo.license.name : 'Nenhuma'}</p>
          <p>Linguagem: {repo.language || 'Desconhecida'}</p>

          {repo.homepage && (
            <p>
              <a href={repo.homepage} target="_blank" rel="noreferrer">
                <Stack direction="horizontal" gap={1}>
                  <Globe />
                  {repo.homepage}
                </Stack>
              </a>
            </p>
          )}

          <div className="my-4">
            {repo.topics.map((topic) => (
              <Badge key={topic} pill className="me-1">
                {topic}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default RepoDetails;
