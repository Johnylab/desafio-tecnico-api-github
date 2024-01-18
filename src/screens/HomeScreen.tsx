import { useContext, useState } from 'react';
import type { ChangeEvent } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const [username, setUsername] = useState('');
  const { userData, loadUserData } = useContext(GlobalContext);

  async function onSearchClick() {
    await loadUserData(username);
  }

  return (
    <div>
      <h1>Procurar usuário do GitHub</h1>

      <input
        type="text"
        placeholder="Digite o nome do usuário"
        value={username}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      <button type="button" onClick={onSearchClick}>
        Buscar
      </button>

      {userData.error && <p>{userData.error}</p>}

      {userData.login && (
        <div>
          <img src={userData.avatar_url} alt={userData.name} width={90} />
          <p>
            <Link to={`/${userData.login}`}>
              {userData.name || userData.login}
            </Link>
          </p>
          <p>{userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
