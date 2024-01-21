import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

type SearchFormProps = {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
};

function SearchForm({ onSubmit, isLoading = false }: SearchFormProps) {
  const [username, setUsername] = useState('');

  function onSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(username);
  }

  return (
    <Container className="my-3">
      <h1>Buscar usuário do GitHub</h1>

      <Form onSubmit={onSearchSubmit}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Digite o nome do usuário"
            value={username}
            onInput={onSearchInput}
          />
          <Button variant="secondary" type="submit" disabled={isLoading}>
            <Search aria-label="Pesquisar" />
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default SearchForm;
