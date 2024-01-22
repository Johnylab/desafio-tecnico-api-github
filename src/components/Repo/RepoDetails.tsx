import { Badge, Col, Container, Row, Stack } from 'react-bootstrap';
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
    <Container>
      <h1>{repo.name}</h1>
      <p>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          <Stack direction="horizontal" gap={1}>
            <span className="ms-auto">{repo.full_name}</span>
            <BoxArrowUpRight />
          </Stack>
        </a>
      </p>

      <Row>
        <Col>
          <CountDisplay
            className="gx-2 mb-3"
            icon={Star}
            count={repo.stargazers_count}
            singular="estrela"
            fallback="Nenhuma estrela"
          />
          <CountDisplay
            className="gx-2 mb-3"
            icon={Eye}
            count={repo.watchers_count}
            singular="observador"
            plural="observadores"
            fallback="Nenhum observador"
          />
          <CountDisplay
            className="gx-2 mb-3"
            icon={Diagram2}
            count={repo.forks}
            singular="fork"
            fallback="Nenhum fork"
          />
          <CountDisplay
            className="gx-2 mb-3"
            icon={ExclamationSquare}
            count={repo.open_issues_count}
            singular="issue"
            fallback="Nenhuma issue"
          />
        </Col>
        <Col>
          <p>{repo.description}</p>

          <div className="my-4">
            {repo.topics.map((topic) => (
              <Badge key={topic} pill className="me-1">
                {topic}
              </Badge>
            ))}
          </div>

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
        </Col>
      </Row>
    </Container>
  );
}

export default RepoDetails;
