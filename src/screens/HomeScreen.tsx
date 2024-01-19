import type { ChangeEvent, FormEvent } from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function SearchForm({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [username, setUsername] = useState('');

  function onSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();

    if (!username) {
      return;
    }

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

function SearchHistory() {
  const searchHistory = Object.values(localStorage)
    .map((value) => {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (!searchHistory.length) {
    return null;
  }

  return (
    <>
      <h2>Histórico de busca</h2>
      {searchHistory.map((data) => (
        <p>
          <img src={data.avatar_url} alt={data.name} width={30} />
          <Link to={`/${data.login}`}>{data.name || data.login}</Link>
        </p>
      ))}
    </>
  );
}

function HomeScreen() {
  const { userData, loadUserData } = useContext(GlobalContext);

  return (
    <div>
      <SearchForm onSubmit={loadUserData} />

      {userData.message && <p>{userData.message}</p>}

      <SearchHistory />
    </div>
  );
}

export default HomeScreen;
