import { Link } from 'react-router-dom';
import { UserData } from '../github/api';

type SearchHistoryProps = {
  items: UserData[];
};

function SearchHistory({ items }: SearchHistoryProps) {
  return (
    <>
      <h2>Buscas recentes</h2>

      {items.map((data) => (
        <p key={data.login}>
          <img src={data.avatar_url} alt={data.name} width={30} />
          <Link to={`/${data.login}`}>{data.name || data.login}</Link>
        </p>
      ))}
    </>
  );
}

export default SearchHistory;
