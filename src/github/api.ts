async function fetchUserData(username: string) {
  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!userResponse.ok) {
      return {
        error: 'Usuário não encontrado',
      };
    }

    const userProfile = await userResponse.json();
    const reposResponse = await fetch(userProfile.repos_url);

    if (!reposResponse.ok) {
      return {
        ...userProfile,
        error: 'Repositórios não encontrados',
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
      error: error.message,
    };
  }
}

export { fetchUserData };
