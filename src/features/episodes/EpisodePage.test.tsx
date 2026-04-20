import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EpisodePage } from './EpisodePage';

test('renders episode metadata and prose', async () => {
  render(
    <MemoryRouter initialEntries={['/episodes/episode-001']}>
      <Routes>
        <Route path="/episodes/:slug" element={<EpisodePage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByText(/Фокус:/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Синий рукав, красный сигнал' })).toBeInTheDocument();
});

test('does not render generation metadata inside episode prose', async () => {
  render(
    <MemoryRouter initialEntries={['/episodes/episode-001']}>
      <Routes>
        <Route path="/episodes/:slug" element={<EpisodePage />} />
      </Routes>
    </MemoryRouter>,
  );

  await screen.findByRole('heading', { name: 'Синий рукав, красный сигнал' });

  expect(screen.queryByText(/Prediction ID/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^Prompt$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Файл вывода/i)).not.toBeInTheDocument();
});

test('renders rich episode navigation with back link, progress, and quick jump', async () => {
  render(
    <MemoryRouter initialEntries={['/episodes/episode-001']}>
      <Routes>
        <Route path="/episodes/:slug" element={<EpisodePage />} />
      </Routes>
    </MemoryRouter>,
  );

  await screen.findByRole('heading', { name: 'Синий рукав, красный сигнал' });

  expect(screen.getByRole('link', { name: /Вернуться к эпизодам/i })).toBeInTheDocument();
  expect(screen.getByText(/Эпизод 001 из 063/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Следующий/i })).toHaveAttribute(
    'href',
    '/episodes/episode-002',
  );
  expect(screen.getByRole('combobox', { name: /Быстрый переход по эпизодам/i })).toBeInTheDocument();
});
