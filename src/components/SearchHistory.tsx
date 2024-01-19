import { Link } from 'react-router-dom';
import { UserData } from '../github/api';

function SearchHistory() {
  const searchHistory: UserData[] = Object.values(localStorage)
    .map((value) => {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    })
    .filter((user) => user?.login)
    .sort(
      ({ last_updated_at: a }, { last_updated_at: b }) =>
        new Date(b).getTime() - new Date(a).getTime()
    );

  if (!searchHistory.length) {
    return null;
  }

  return (
    <>
      <h2>Resultados recentes</h2>

      {searchHistory.map((data) => (
        <p key={data.login}>
          <img src={data.avatar_url} alt={data.name} width={30} />
          <Link to={`/${data.login}`}>{data.name || data.login}</Link>
        </p>
      ))}
    </>
  );
}

export default SearchHistory;
