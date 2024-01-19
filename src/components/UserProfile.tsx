import { UserData } from '../github/api';

type UserProfileProps = {
  data: UserData;
};

function UserProfile({ data }: UserProfileProps) {
  return (
    <div>
      <h1>{data.name || data.login}</h1>
      <img src={data.avatar_url} alt={data.name} width={200} />
      <p>
        {data.type} {data.company}{' '}
        <a href={data.html_url} target="_blank" rel="noreferrer">
          @{data.login}
        </a>
      </p>
      <p>
        <a href="mailto:{userData.email}">{data.email}</a>
      </p>
      <p>{data.location}</p>
      <p>Seguidores: {data.followers}</p>
      <p>Seguindo: {data.following}</p>
      <p>{data.bio}</p>
    </div>
  );
}

export default UserProfile;
