import { withBaseAssetPath } from '../content/assetPaths';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-panel">
        <div className="site-footer-primary">
          <p>© 2026 Ilya G Mirin</p>
          <a
            href="https://www.linkedin.com/in/ilyamirin"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="site-footer-secondary">
          <p>All rights reserved / Все права защищены</p>
          <a href={withBaseAssetPath('LICENSE')}>Лицензия</a>
        </div>
      </div>
    </footer>
  );
}
