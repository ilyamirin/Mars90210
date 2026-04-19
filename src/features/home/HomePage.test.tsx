import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

test('renders heroine-first hero and episode CTA', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByText('Четыре женщины под одним куполом')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Читать эпизоды' })).toBeInTheDocument();
});

test('renders the approved homepage sections', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Четыре героини' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Сейчас читать' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Мир под куполом' })).toBeInTheDocument();
});

test('keeps a single primary call to action on the homepage', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getAllByRole('link', { name: 'Читать эпизоды' })).toHaveLength(1);
});
