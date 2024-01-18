import { useParams } from 'react-router-dom';

function RepoScreen() {
  const { username, reponame } = useParams();
  return (
    <div>
      <h1>{reponame}</h1>
      <p>{username}</p>
    </div>
  );
}

export default RepoScreen;
