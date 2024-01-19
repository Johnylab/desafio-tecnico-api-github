import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function SearchResult() {
  const { userData } = useContext(GlobalContext);

  if (userData.message) {
    return <p>{userData.message}</p>;
  }

  if (!userData.login) {
    return null;
  }

  return (
    <div>
      <img src={userData.avatar_url} alt={userData.name} width={100} />
      <p>
        <Link to={`/${userData.login}`}>{userData.name || userData.login}</Link>
      </p>
      <p>{userData.bio}</p>
      {userData.repos?.length && <p>{userData.repos?.length} repositórios</p>}
      <p>{userData.followers} seguidores</p>
      <p>Seguindo {userData.following}</p>
    </div>
  );
}

export default SearchResult;
