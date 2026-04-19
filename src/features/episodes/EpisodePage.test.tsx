import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EpisodePage } from './EpisodePage';

test('renders episode metadata and prose', () => {
  render(
    <MemoryRouter initialEntries={['/episodes/episode-001']}>
      <Routes>
        <Route path="/episodes/:slug" element={<EpisodePage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Синий рукав, красный сигнал' })).toBeInTheDocument();
  expect(screen.getByText(/Фокус:/)).toBeInTheDocument();
});
