import { RouteObject } from 'react-router-dom';
import { CharacterPage } from '../features/characters/CharacterPage';
import { CharactersPage } from '../features/characters/CharactersPage';
import { AboutPage } from '../features/about/AboutPage';
import { EpisodePage } from '../features/episodes/EpisodePage';
import { EpisodesPage } from '../features/episodes/EpisodesPage';
import { HomePage } from '../features/home/HomePage';
import { WorldPage } from '../features/world/WorldPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/characters',
    element: <CharactersPage />,
  },
  {
    path: '/characters/:slug',
    element: <CharacterPage />,
  },
  {
    path: '/episodes',
    element: <EpisodesPage />,
  },
  {
    path: '/episodes/:slug',
    element: <EpisodePage />,
  },
  {
    path: '/world',
    element: <WorldPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
];
