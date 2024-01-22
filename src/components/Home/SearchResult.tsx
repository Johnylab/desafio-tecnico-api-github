import { Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { Git, HeartFill, PeopleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import type { UserData } from '../../github/types';
import CountDisplay from '../CountDisplay';

type SearchResultProps = {
  data: UserData;
  isLoading?: boolean;
};

function SearchResult({ data, isLoading }: SearchResultProps) {
  if (isLoading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  if (data.message) {
    return (
      <Container>
        <p>{data.message}</p>
      </Container>
    );
  }

  if (!data.login) {
    return null;
  }

  return (
    <Container className="my-3">
      <Card className="p-3">
        <Row>
          <Col className="flex-grow-0">
            <Image rounded src={data.avatar_url} alt={data.name} width={120} />
          </Col>

          <Col>
            <p className="lead">
              <Link to={`/${data.login}`}>{data.name || data.login}</Link>
            </p>

            <Row className="mb-2">
              <Col>
                <CountDisplay
                  icon={Git}
                  count={data.public_repos}
                  singular="repositório"
                  fallback={
                    <small className="text-secondary">Nenhum repositório</small>
                  }
                  className="gx-2"
                />
              </Col>

              <Col>
                <CountDisplay
                  icon={PeopleFill}
                  count={data.followers}
                  singular="seguidor"
                  plural="seguidores"
                  fallback={
                    <small className="text-secondary">Nenhum seguidor</small>
                  }
                  className="gx-2"
                />
              </Col>

              <Col>
                <CountDisplay
                  icon={HeartFill}
                  count={data.following}
                  singular="seguido"
                  fallback={
                    <small className="text-secondary">Não segue ninguém</small>
                  }
                  className="gx-2"
                />
              </Col>
            </Row>

            <p>
              <small>{data.bio}</small>
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default SearchResult;
