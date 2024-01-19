type Repository = {
  id: number;
  name: string;
  full_name: string;
  homepage: string;
  html_url: string;
  forks: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  description: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  open_issues_count: number;
  license: {
    name: string;
    url: string;
  } | null;
  owner: UserData;
};

type UserData = Partial<{
  name: string;
  login: string;
  email: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string;
  bio: string;
  type: string;
  company: string;
  repos: Repository[];
  message: string;
  last_updated_at: Date;
}>;

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

export type { UserData, Repository };
