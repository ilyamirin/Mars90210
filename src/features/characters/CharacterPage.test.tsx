import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CharacterPage } from './CharacterPage';

test('renders the requested character details', () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={['/characters/lira']}>
      <Routes>
        <Route path="/characters/:slug" element={<CharacterPage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Лира' })).toBeInTheDocument();
  expect(getByTestId('character-portrait-block')).toBeInTheDocument();
  expect(getByTestId('character-copy-block')).toBeInTheDocument();
});

test('uses role-aware and gender-safe copy for secondary male characters', () => {
  render(
    <MemoryRouter initialEntries={['/characters/vladimir']}>
      <Routes>
        <Route path="/characters/:slug" element={<CharacterPage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Владимир' })).toBeInTheDocument();
  expect(screen.getByText('антагонист')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Портрет персонажа Владимир' })).toBeInTheDocument();
  expect(screen.queryByText('Портрет появится позже')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Назад к персонажам' })).toBeInTheDocument();
  expect(screen.queryByText('Героиня')).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Назад к героиням' })).not.toBeInTheDocument();
});
