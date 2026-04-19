import { useRoutes } from 'react-router-dom';
import { SiteLayout } from './layout/SiteLayout';
import { routes } from './routes';

export default function App() {
  const content = useRoutes(routes);

  return (
    <SiteLayout>{content}</SiteLayout>
  );
}
