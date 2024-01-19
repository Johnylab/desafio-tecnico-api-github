import SearchForm from '../components/SearchForm';
import SearchHistory from '../components/SearchHistory';
import SearchResult from '../components/SearchResult';

function HomeScreen() {
  return (
    <div>
      <SearchForm />
      <SearchResult />
      <SearchHistory />
    </div>
  );
}

export default HomeScreen;
