import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

test('renders about sections and generated artwork slots', () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /О проекте, AI gen/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'О проекте' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Как здесь работает AI gen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Кто это делает' })).toBeInTheDocument();
  expect(screen.getAllByText(/^О проекте$/).length).toBeGreaterThan(0);
  expect(screen.getByRole('img', { name: /Тихий вечер под марсианским куполом/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /Рабочий стол с раскадровками/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /Автор и инженер за рабочим столом/i })).toBeInTheDocument();
  expect(
    screen.getByText(/AI здесь участвовал не только в изображениях/i),
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Codex' }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: '$replicate-nano-banana-2-http' }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: '$playwright' }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: 'AGENTS.md' }).length).toBeGreaterThan(0);
});
