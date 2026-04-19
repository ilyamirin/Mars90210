import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

test('renders heroine-first hero and a tappable current episode card', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByText('Четыре женщины под одним куполом')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Лира' }).length).toBe(1);
  expect(screen.getAllByRole('link', { name: /Читать Синий рукав, красный сигнал/i }).length).toBeGreaterThan(0);
  expect(getByTestId('heroine-card-lira').children[0]).toBe(getByTestId('heroine-portrait-lira'));
  expect(getByTestId('heroine-card-lira').children[1]).toBe(getByTestId('heroine-copy-lira'));
});

test('renders the approved homepage sections', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'О проекте' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Сейчас читать' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Мир под куполом' })).toBeInTheDocument();
});

test('renders tappable portrait cards for all heroines', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getAllByRole('link', { name: /Лира/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Айгуль/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Марта/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Руслана/i }).length).toBeGreaterThan(0);
});

test('uses a restrained action model on the homepage', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.queryByRole('link', { name: 'Мир под куполом' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Читать об этом подробнее' })).toBeInTheDocument();
  expect(screen.getAllByText(/Читать далее/i).length).toBeGreaterThan(0);
});
