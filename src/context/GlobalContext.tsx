import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useState } from 'react';
import { UserData, fetchUserData } from '../github/api';
import { getStorage, setStorage } from '../utils/storage';

type GlobalContextType = {
  userData: UserData;
  loadUserData: (username: string) => Promise<void>;
};

const initialState = {
  userData: {} as UserData,
  loadUserData: async () => {},
};

export const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [userProfile, setUserProfile] = useState({} as UserData);

  const loadUserData = useCallback(async function (username: string) {
    if (!username) {
      return;
    }

    const storageKey = `@gh-user:${username.toLowerCase()}`;
    const userPersistedData = getStorage(storageKey, null);
    if (userPersistedData) {
      setUserProfile(userPersistedData);
      return;
    }

    if (username.includes(' ')) {
      setUserProfile({
        message: 'O nome de usuário não pode conter espaços',
        last_updated_at: new Date(),
      });
      return;
    }

    setUserProfile({ message: 'Carregando...' });
    const response = await fetchUserData(username);
    const userData = response.login
      ? { ...response, last_updated_at: new Date() }
      : response;
    setUserProfile(userData);
    setStorage(storageKey, userData);
  }, []);

  return (
    <GlobalContext.Provider value={{ userData: userProfile, loadUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
