import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <header className="site-header">
      <NavLink className="site-brand" to="/">
        Mars90210
      </NavLink>
      <nav aria-label="Основная" className="site-nav">
        <NavLink to="/characters">Персонажи</NavLink>
        <NavLink to="/episodes">Эпизоды</NavLink>
        <NavLink to="/world">Мир</NavLink>
        <NavLink to="/about">О проекте</NavLink>
      </nav>
    </header>
  );
}
