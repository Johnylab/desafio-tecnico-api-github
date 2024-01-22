import { Card, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import {
  BoxArrowUpRight,
  BuildingFill,
  GeoAltFill,
  HeartFill,
  PeopleFill,
  PersonCircle,
} from 'react-bootstrap-icons';
import { userTypes } from '../../github/constants';
import type { UserData } from '../../github/types';
import CountDisplay from '../CountDisplay';

type UserProfileProps = {
  data: UserData;
};

function UserProfile({ data }: UserProfileProps) {
  return (
    <Container className="my-3">
      <Card className="p-3">
        <Row>
          <Col className="flex-grow-0">
            <Image rounded src={data.avatar_url} alt={data.name} width={200} />
          </Col>

          <Col>
            <h1>{data.name || data.login}</h1>
            <Row>
              <Col>
                {data.company && (
                  <p>
                    <small>{data.company}</small>
                  </p>
                )}
                {data.email && (
                  <p>
                    <small>
                      <a href={`mailto:${data.email}`}>{data.email}</a>
                    </small>
                  </p>
                )}

                <Row className="flex-nowrap align-items-center gx-2 mb-1">
                  <Col className="flex-grow-0">
                    {data.type === userTypes.ORGANIZATION ? (
                      <BuildingFill />
                    ) : (
                      <PersonCircle />
                    )}
                  </Col>
                  <Col>
                    <a href={data.html_url} target="_blank" rel="noreferrer">
                      <Stack direction="horizontal" gap={1}>
                        <span>{data.login}</span>
                        <BoxArrowUpRight />
                      </Stack>
                    </a>
                  </Col>
                </Row>

                {data.location && (
                  <Row className="align-items-center gx-2 mb-1">
                    <Col className="flex-grow-0">
                      <GeoAltFill />
                    </Col>
                    <Col>{data.location}</Col>
                  </Row>
                )}
                <CountDisplay
                  className="gx-2 mb-1"
                  icon={PeopleFill}
                  count={data.followers}
                  singular="seguidor"
                  plural="seguidores"
                  fallback={
                    <small className="text-secondary">Nenhum seguidor</small>
                  }
                />
                <CountDisplay
                  className="gx-2 mb-1"
                  icon={HeartFill}
                  count={data.following}
                  singular="seguido"
                  fallback={
                    <small className="text-secondary">Nenhum seguido</small>
                  }
                />
              </Col>

              <Col md={6}>
                <p>
                  <small>{data.bio}</small>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default UserProfile;
