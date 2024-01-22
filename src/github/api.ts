import { endpoints, notFoundMessages } from './constants';
import { UserData } from './types';

async function fetchUserData(username: string): Promise<UserData> {
  try {
    const userResponse = await fetch(`${endpoints.USERS}/${username}`);

    if (!userResponse.ok) {
      return {
        message: notFoundMessages.USER,
      };
    }

    const userProfile = await userResponse.json();
    const reposResponse = await fetch(userProfile.repos_url);

    if (!reposResponse.ok) {
      return {
        ...userProfile,
        repos: [],
        message: notFoundMessages.REPO,
      };
    }

    const userRepos = await reposResponse.json();

    return {
      ...userProfile,
      repos: userRepos,
    };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Ocorreu um erro desconhecido');

    return {
      message: error.message,
    };
  }
}

export { fetchUserData };
