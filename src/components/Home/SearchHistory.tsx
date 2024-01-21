import { Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { Git, HeartFill, PeopleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { UserData } from '../../github/api';
import CountDisplay from '../CountDisplay';

type SearchHistoryProps = {
  items: UserData[];
};

function SearchHistory({ items }: SearchHistoryProps) {
  return (
    <Container className="my-3">
      <h2>Buscas recentes</h2>

      <ListGroup>
        {items.map((data) => (
          <ListGroup.Item
            key={data.login}
            action
            as={Link}
            to={`/${data.login}`}
          >
            <Row className="align-items-center">
              <Col className="flex-grow-0">
                <Image
                  rounded
                  src={data.avatar_url}
                  alt={data.name}
                  width={30}
                />
              </Col>

              <Col>{data.name || data.login}</Col>

              <Col sm="2" className="flex-grow-0 mx-3">
                <CountDisplay
                  icon={Git}
                  count={data.public_repos}
                  singular=""
                  plural=""
                  fallback="0"
                />
              </Col>

              <Col sm="2" className="flex-grow-0 mx-3">
                <CountDisplay
                  icon={PeopleFill}
                  count={data.followers}
                  singular=""
                  plural=""
                  fallback="0"
                />
              </Col>

              <Col sm="2" className="flex-grow-0 mx-3">
                <CountDisplay
                  icon={HeartFill}
                  count={data.following}
                  singular=""
                  plural=""
                  fallback="0"
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default SearchHistory;
