import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteLayout } from './SiteLayout';

test('renders brand and primary navigation', () => {
  render(
    <MemoryRouter>
      <SiteLayout>
        <div>Body</div>
      </SiteLayout>
    </MemoryRouter>,
  );

  expect(screen.getByText('Mars90210')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Героини' })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
