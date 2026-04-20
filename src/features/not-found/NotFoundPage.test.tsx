import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

test('renders branded lost route not found page', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Здесь нет нужной двери' })).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: 'Пустой коридор Orbita под куполом Марса' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'Читать сезон' })).toHaveAttribute(
    'href',
    '/episodes',
  );
  expect(screen.getByRole('link', { name: 'Смотреть персонажей' })).toHaveAttribute(
    'href',
    '/characters',
  );
});
