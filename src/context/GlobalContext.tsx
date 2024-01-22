import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useState } from 'react';
import { fetchUserData } from '../github/api';
import type { UserData } from '../github/types';
import { userStorage } from '../github/localStorage';

type GlobalContextType = {
  userData: UserData;
  isLoading: boolean;
  loadUserData: (username: string, ignoreCache?: boolean) => Promise<UserData>;
};

const initialState = {
  userData: {} as UserData,
  isLoading: false,
  loadUserData: async () => ({}),
};

export const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState({} as UserData);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserData = useCallback(async function (
    username: string,
    ignoreCache = false
  ) {
    if (!username) {
      setUserData(initialState.userData);
      return {
        message: 'Digite o nome do usuário',
      };
    }

    if (username.includes(' ')) {
      setUserData(initialState.userData);
      return {
        message: 'O nome de usuário não pode conter espaços',
      };
    }

    const storageKey = username.toLowerCase();
    const userPersistedData = userStorage.get(storageKey);

    if (!ignoreCache) {
      if (userPersistedData) {
        setUserData(userPersistedData);
        return userPersistedData;
      }
    }

    setIsLoading(true);
    const response = await fetchUserData(username);
    const data = response.login
      ? { ...response, last_updated_at: new Date() }
      : response;
    setUserData(data);
    setIsLoading(false);
    userStorage.set(storageKey, data);
    return data;
  },
  []);

  return (
    <GlobalContext.Provider value={{ userData, isLoading, loadUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
