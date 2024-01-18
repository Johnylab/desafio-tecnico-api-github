import type { ChangeEvent, FormEvent } from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function HomeScreen() {
  const [username, setUsername] = useState('');
  const { userData, loadUserData } = useContext(GlobalContext);

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
    <div>
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

      {userData.message && <p>{userData.message}</p>}

      {userData.login && (
        <>
          <img src={userData.avatar_url} alt={userData.name} width={90} />
          <p>
            <Link to={`/${userData.login}`}>
              {userData.name || userData.login}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default HomeScreen;
