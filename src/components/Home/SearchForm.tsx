import { ChangeEvent, FormEvent, useState } from 'react';

type SearchFormProps = {
  onSubmit: (username: string) => void;
};

function SearchForm({ onSubmit }: SearchFormProps) {
  const [username, setUsername] = useState('');

  function onSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(username);
  }

  return (
    <>
      <h1>Buscar usuário do GitHub</h1>

      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          value={username}
          onInput={onSearchInput}
        />
        <button type="submit">Buscar</button>
      </form>
    </>
  );
}

export default SearchForm;
