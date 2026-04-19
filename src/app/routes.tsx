import { RouteObject } from 'react-router-dom';
import { HomePage } from '../features/home/HomePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/characters',
    element: <div>Героини</div>,
  },
  {
    path: '/episodes',
    element: <div>Эпизоды</div>,
  },
  {
    path: '/world',
    element: <div>Мир</div>,
  },
  {
    path: '/about',
    element: <div>О проекте</div>,
  },
];
