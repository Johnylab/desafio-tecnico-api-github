import { Card, Col, Image, Placeholder, Row } from 'react-bootstrap';

function UserProfile() {
  return (
    <Card className="p-3">
      <Row>
        <Col className="flex-grow-0">
          <Placeholder animation="glow">
            <Placeholder as={Image} rounded width={200} height={200} />
          </Placeholder>
        </Col>

        <Col>
          <Placeholder as="h1" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Row>
            <Col>
              <Placeholder as="a" href="#" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="a" href="#" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Col>

            <Col md={6}>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={2} /> <Placeholder xs={5} />{' '}
                <Placeholder xs={3} /> <Placeholder xs={8} />{' '}
                <Placeholder xs={3} /> <Placeholder xs={2} />{' '}
                <Placeholder xs={4} /> <Placeholder xs={4} />
              </Placeholder>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default UserProfile;
