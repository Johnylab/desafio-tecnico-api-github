import { ReactNode } from 'react';
import { Stack } from 'react-bootstrap';

function AppContainer({ children }: { children: ReactNode }) {
  return <Stack className="min-vh-100">{children}</Stack>;
}

export default AppContainer;
