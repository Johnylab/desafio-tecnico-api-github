import { Link } from 'react-router-dom';
import { UserData } from '../../github/api';

type SearchResultProps = {
  data: UserData;
};

function SearchResult({ data }: SearchResultProps) {
  if (data.message) {
    return <p>{data.message}</p>;
  }

  if (!data.login) {
    return null;
  }

  return (
    <div>
      <img src={data.avatar_url} alt={data.name} width={100} />
      <p>
        <Link to={`/${data.login}`}>{data.name || data.login}</Link>
      </p>
      <p>
        <a href="mailto:{userData.email}">{data.email}</a>
      </p>
      <p>{data.bio}</p>
      {data.repos?.length && <p>{data.repos?.length} repositórios</p>}
      <p>{data.followers} seguidores</p>
      <p>Seguindo {data.following}</p>
    </div>
  );
}

export default SearchResult;
