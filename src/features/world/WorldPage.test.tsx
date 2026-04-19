import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WorldPage } from './WorldPage';

test('renders world as short-form visual cards instead of full markdown dump', () => {
  render(
    <MemoryRouter>
      <WorldPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Мир под куполом' })).toBeInTheDocument();
  expect(screen.getAllByRole('img').length).toBeGreaterThan(2);
  expect(screen.queryByText('Психологическая правда мира')).not.toBeInTheDocument();
});
