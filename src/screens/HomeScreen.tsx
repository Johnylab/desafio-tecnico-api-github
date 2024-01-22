import { useContext, useState } from 'react';
import SearchForm from '../components/Home/SearchForm';
import SearchHistory from '../components/Home/SearchHistory';
import SearchResult from '../components/Home/SearchResult';
import { GlobalContext } from '../context/GlobalContext';
import { userStorage } from '../github/localStorage';
import type { UserData } from '../github/types';

function HomeScreen() {
  const [searchResult, setSearchResult] = useState<UserData>({});
  const { isLoading, loadUserData } = useContext(GlobalContext);

  const searchHistory = userStorage.getAllItems().sort((a, b) => {
    const dateA = new Date(a.last_updated_at || 0);
    const dateB = new Date(b.last_updated_at || 0);
    return dateB.getTime() - dateA.getTime();
  });

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

  function clearHistory() {
    userStorage.clear();
    setSearchResult({});
  }

  return (
    <div className="my-auto">
      <SearchForm onSubmit={onSearch} isLoading={isLoading} />
      <SearchResult data={searchResult} isLoading={isLoading} />
      <SearchHistory
        items={searchHistory}
        refreshUser={refreshUser}
        clearHistory={clearHistory}
      />
    </div>
  );
}

export default HomeScreen;
