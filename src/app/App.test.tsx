import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders primary site navigation', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'Персонажи' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Эпизоды' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Мир' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'О проекте' })).toBeInTheDocument();
});

test('renders branded not found page for unknown routes', () => {
  render(
    <MemoryRouter initialEntries={['/lost-under-the-dome']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Здесь нет нужной двери' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'На главную' })).toBeInTheDocument();
});
