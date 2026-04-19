import { Link, useRoutes } from 'react-router-dom';
import { routes } from './routes';

export default function App() {
  const content = useRoutes(routes);

  return (
    <div>
      <nav aria-label="Основная">
        <Link to="/characters">Героини</Link>
        <Link to="/episodes">Эпизоды</Link>
        <Link to="/world">Мир</Link>
      </nav>
      {content}
    </div>
  );
}
