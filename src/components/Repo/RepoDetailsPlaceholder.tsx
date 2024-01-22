import { Col, ListGroup, Placeholder, Row, Stack } from 'react-bootstrap';

function RepoDetailsPlaceholder() {
  return (
    <>
      <Placeholder as="h1" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>

      <Placeholder as="p" animation="glow">
        <Stack direction="horizontal" className="justify-content-end">
          <Placeholder xs={6} />
        </Stack>
      </Placeholder>

      <Placeholder as="p" animation="glow">
        <Placeholder xs={5} /> <Placeholder xs={4} /> <Placeholder xs={1} />{' '}
        <Placeholder xs={3} /> <Placeholder xs={6} /> <Placeholder xs={5} />{' '}
        <Placeholder xs={1} />
      </Placeholder>

      <Row>
        <Col>
          <Placeholder as={ListGroup} variant="flush" animation="glow">
            <Placeholder as={ListGroup.Item} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as={ListGroup.Item} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as={ListGroup.Item} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as={ListGroup.Item} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </Placeholder>
        </Col>
        <Col>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>

          <Placeholder as="div" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Col>
      </Row>
    </>
  );
}

export default RepoDetailsPlaceholder;
