import { Container } from 'react-bootstrap';
import type { UserData } from '../../github/types';
import SearchResultCard from './SearchResultCard';
import SearchResultPlaceholder from './SearchResultPlaceholder';

type SearchResultProps = {
  data: UserData;
  isLoading?: boolean;
};

function SearchResult({ data, isLoading }: SearchResultProps) {
  if (isLoading) {
    return <SearchResultPlaceholder />;
  }

  if (data.message) {
    return (
      <Container>
        <p>{data.message}</p>
      </Container>
    );
  }

  if (!data.login) {
    return null;
  }

  return <SearchResultCard data={data} />;
}

export default SearchResult;
