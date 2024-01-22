import { Card, Col, Image, Placeholder, Row } from 'react-bootstrap';

function SearchResultPlaceholder() {
  return (
    <Card className="p-3">
      <Row>
        <Col className="flex-grow-0">
          <Placeholder animation="glow">
            <Placeholder
              as={Image}
              rounded
              style={{ width: 120, height: 120 }}
            />
          </Placeholder>
        </Col>

        <Col>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>

          <Row className="mb-3">
            <Col>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Col>

            <Col>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Col>

            <Col>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Col>
          </Row>

          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={3} /> <Placeholder xs={2} /> <Placeholder xs={5} />{' '}
            <Placeholder xs={4} /> <Placeholder xs={3} />
          </Placeholder>
        </Col>
      </Row>
    </Card>
  );
}

export default SearchResultPlaceholder;
