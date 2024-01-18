import { createContext, useCallback, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { fetchUserData } from '../github/api';

type Repository = {
  id: number;
  name: string;
  html_url: string;
};

type UserData = Partial<{
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  repos: Repository[];
  error: string;
}>;

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

    if (username.includes(' ')) {
      setUserProfile({
        error: 'O nome de usuário não pode conter espaços',
      });
      return;
    }

    const response = await fetchUserData(username);
    setUserProfile(response);
  }, []);

  return (
    <GlobalContext.Provider value={{ userData: userProfile, loadUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
