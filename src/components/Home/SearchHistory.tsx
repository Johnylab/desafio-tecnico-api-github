import { FormEvent, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner,
  Stack,
} from 'react-bootstrap';
import { ArrowRepeat, Git, HeartFill, PeopleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import type { UserData } from '../../github/types';
import CountDisplay from '../CountDisplay';

type SearchHistoryProps = {
  items: UserData[];
  refreshUser: (user: UserData) => Promise<void>;
};

function SearchHistory({ items, refreshUser }: SearchHistoryProps) {
  const [loadingSates, setLoadingSates] = useState(
    items.reduce((acc, item) => {
      acc[item.login as string] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  function setIsLoading(user: UserData, isLoading: boolean) {
    setLoadingSates((prevState) => ({
      ...prevState,
      [user.login as string]: isLoading,
    }));
  }

  if (!items.length) {
    return null;
  }

  async function handleRefreshClick(
    e: FormEvent<HTMLButtonElement>,
    user: UserData
  ) {
    e.preventDefault();
    if (loadingSates[user.login as string]) {
      return;
    }

    setIsLoading(user, true);
    await refreshUser(user);
    setIsLoading(user, false);
  }

  return (
    <Container className="py-4 mb-auto">
      <h2 className="fs-5">
        {items.length === 1 ? 'Busca recente' : 'Buscas recentes'}
      </h2>

      <ListGroup>
        {items.map((data) => (
          <ListGroup.Item
            key={data.login}
            action
            as={Link}
            to={`/${data.login}`}
          >
            <Row className="align-items-center">
              <Col>
                <Stack direction="horizontal">
                  <Image
                    rounded
                    src={data.avatar_url}
                    alt={data.name}
                    width={30}
                  />

                  <div className="mx-2">{data.name || data.login}</div>

                  <Button
                    variant="light"
                    size="sm"
                    className="ms-auto"
                    onClick={(e) => handleRefreshClick(e, data)}
                  >
                    {loadingSates[data.login as string] ? (
                      <Spinner size="sm" />
                    ) : (
                      <ArrowRepeat />
                    )}
                  </Button>
                </Stack>
              </Col>

              <Col sm={6}>
                <Row>
                  <Col xs={1} sm={0} />
                  <Col>
                    <CountDisplay
                      icon={Git}
                      count={data.public_repos}
                      singular=""
                      plural=""
                      fallback="0"
                      className="ms-2 g-2"
                    />
                  </Col>
                  <Col>
                    <CountDisplay
                      icon={PeopleFill}
                      count={data.followers}
                      singular=""
                      plural=""
                      fallback="0"
                      className="ms-2 g-2"
                    />
                  </Col>
                  <Col>
                    <CountDisplay
                      icon={HeartFill}
                      count={data.following}
                      singular=""
                      plural=""
                      fallback="0"
                      className="ms-2 g-2"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default SearchHistory;
