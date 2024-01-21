import type { RowProps } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import Pluralize from './Pluralize';

type CountDisplayProps = {
  count: number | undefined;
  icon: React.ElementType;
  singular: string;
  plural?: string;
  fallback?: React.ReactNode;
} & RowProps;

function CountDisplay({
  count: _count,
  icon: Icon,
  singular,
  plural,
  fallback = null,
  ...props
}: CountDisplayProps) {
  return (
    <Row {...props}>
      <Col className="flex-grow-0">
        <Icon />
      </Col>
      <Col className="text-truncate">
        <Pluralize
          count={_count}
          render={({ count, $ }) => (
            <>
              {count} {$(singular, plural)}
            </>
          )}
          fallback={fallback}
        />
      </Col>
    </Row>
  );
}

export default CountDisplay;
