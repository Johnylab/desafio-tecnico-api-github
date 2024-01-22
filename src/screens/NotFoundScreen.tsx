import { Container } from 'react-bootstrap';
import { userStorage } from '../github/localStorage';

function NotFoundScreen() {
  const searchHistory = userStorage.getAllItems();

  return (
    <Container className="py-5 mb-auto">
      <h1>404</h1>

      <p>Página não encontrada</p>

      <p>
        <a href="/">Voltar para a página inicial</a>
      </p>

      {searchHistory.length > 0 && (
        <>
          <p>Últimas buscas:</p>

          <ul>
            {searchHistory.map((item) => (
              <li key={item.login}>
                <a href={`/${item.login}`}>{item.name || item.login}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}

export default NotFoundScreen;
