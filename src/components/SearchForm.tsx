import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function SearchForm() {
  const { loadUserData } = useContext(GlobalContext);
  const [username, setUsername] = useState('');

  function onSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();

    if (!username) {
      return;
    }

    loadUserData(username);
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
