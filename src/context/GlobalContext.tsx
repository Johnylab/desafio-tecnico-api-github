import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useState } from 'react';
import { UserData, fetchUserData } from '../github/api';
import { getStorage, setStorage } from '../utils/storage';

type GlobalContextType = {
  userData: UserData;
  loadUserData: (username: string) => Promise<UserData>;
};

const initialState = {
  userData: {} as UserData,
  loadUserData: async () => ({}),
};

export const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState({} as UserData);

  const loadUserData = useCallback(async function (username: string) {
    if (!username) {
      return {
        message: 'Digite o nome do usuário',
      };
    }

    if (username.includes(' ')) {
      return {
        message: 'O nome de usuário não pode conter espaços',
      };
    }

    const storageKey = `@gh-user:${username.toLowerCase()}`;
    const userPersistedData = getStorage(storageKey, null);
    if (userPersistedData) {
      setUserData(userPersistedData);
      return userPersistedData;
    }

    const response = await fetchUserData(username);
    const data = response.login
      ? { ...response, last_updated_at: new Date() }
      : response;
    setUserData(data);
    setStorage(storageKey, data);
    return data;
  }, []);

  return (
    <GlobalContext.Provider value={{ userData, loadUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
