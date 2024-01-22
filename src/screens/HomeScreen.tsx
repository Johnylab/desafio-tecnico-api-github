import { useContext, useState } from 'react';
import SearchForm from '../components/Home/SearchForm';
import SearchHistory from '../components/Home/SearchHistory';
import SearchResult from '../components/Home/SearchResult';
import { GlobalContext } from '../context/GlobalContext';
import type { UserData } from '../github/types';

function HomeScreen() {
  const [searchResult, setSearchResult] = useState<UserData>({});
  const { isLoading, loadUserData } = useContext(GlobalContext);

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

  async function onSearch(username: string) {
    const _result = await loadUserData(username);
    setSearchResult(_result);
  }

  async function refreshUser(user: UserData) {
    if (!user.login) {
      return;
    }
    const _result = await loadUserData(user.login, true);
    setSearchResult(_result);
  }

  return (
    <div className="my-auto">
      <SearchForm onSubmit={onSearch} isLoading={isLoading} />
      <SearchResult data={searchResult} isLoading={isLoading} />
      <SearchHistory items={searchHistory} refreshUser={refreshUser} />
    </div>
  );
}

export default HomeScreen;
