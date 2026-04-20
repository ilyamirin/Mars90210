import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { EpisodesPage } from './EpisodesPage';

test('renders the first batch of episode cards and reveals more on demand', async () => {
  render(
    <MemoryRouter>
      <EpisodesPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: /Читать Синий рукав, красный сигнал/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Читать Дневник на дне ящика/i })).toBeInTheDocument();
  expect(
    screen.getByText(
      'Лира проснулась раньше будильника — от той особенной тишины, которая бывает только под куполом перед началом рабочего дня, когда город ещё не заговорил, но уже дышит.',
    ),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /Читать Маленькая ошибка/i }),
  ).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /Показать ещё/i }));

  expect(screen.getByRole('link', { name: /Читать Маленькая ошибка/i })).toBeInTheDocument();
});
