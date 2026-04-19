import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

test('renders about sections and svg decor', () => {
  const { container } = render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /О проекте, AI gen/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'О проекте' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Как здесь работает AI gen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Кто это делает' })).toBeInTheDocument();
  expect(screen.getAllByText(/^О проекте$/).length).toBeGreaterThan(0);
  expect(container.querySelectorAll('.section-glyph-svg').length).toBeGreaterThan(0);
});
