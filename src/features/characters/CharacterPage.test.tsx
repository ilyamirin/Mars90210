import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CharacterPage } from './CharacterPage';

test('renders the requested heroine details', () => {
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
