import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CharactersPage } from './CharactersPage';

test('splits main heroines and season secondary cast into separate sections', () => {
  render(
    <MemoryRouter>
      <CharactersPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Четыре героини' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Важные люди сезона' })).toBeInTheDocument();

  expect(screen.getByRole('link', { name: 'Лира' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Айгуль' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Марта' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Руслана' })).toBeInTheDocument();

  expect(screen.getByRole('link', { name: 'Силан' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Эйрон' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Алина' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Данил' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Владимир' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Портрет персонажа Силан' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Портрет персонажа Эйрон' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Портрет персонажа Алина' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Портрет персонажа Данил' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Портрет персонажа Владимир' })).toBeInTheDocument();
  expect(screen.queryByText('Портрет появится позже')).not.toBeInTheDocument();
});
