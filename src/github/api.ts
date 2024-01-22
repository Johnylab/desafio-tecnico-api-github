import { UserData } from './types';

async function fetchUserData(username: string): Promise<UserData> {
  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!userResponse.ok) {
      return {
        message: 'Usuário não encontrado',
      };
    }

    const userProfile = await userResponse.json();
    const reposResponse = await fetch(userProfile.repos_url);

    if (!reposResponse.ok) {
      return {
        ...userProfile,
        repos: [],
        message: 'Repositórios não encontrados',
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
