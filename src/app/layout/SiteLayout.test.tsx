import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteLayout } from './SiteLayout';

test('renders brand and primary navigation', () => {
  render(
    <MemoryRouter>
      <SiteLayout>
        <div>Body</div>
      </SiteLayout>
    </MemoryRouter>,
  );

  expect(screen.getByText('Mars90210')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Персонажи' })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getByText(/© 2026 Ilya G Mirin/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/ilyamirin',
  );
  expect(screen.getByRole('link', { name: 'Лицензия' })).toHaveAttribute('href', '/LICENSE');
});
