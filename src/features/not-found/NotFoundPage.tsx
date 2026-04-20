import { Link } from 'react-router-dom';
import { MediaImage } from '../../components/MediaImage';
import { withBaseAssetPath } from '../../content/assetPaths';

const lostRouteImage = {
  src: withBaseAssetPath('media/optimized/site/not-found/lost-route/illustration.png'),
  pngSrc: withBaseAssetPath('media/optimized/site/not-found/lost-route/illustration.png'),
  avifSrc: withBaseAssetPath('media/optimized/site/not-found/lost-route/illustration.avif'),
  alt: 'Пустой коридор Orbita под куполом Марса',
};

export function NotFoundPage() {
  return (
    <div className="content-page not-found-page">
      <section className="not-found-hero">
        <div className="not-found-copy">
          <p className="section-eyebrow">Потерянный маршрут под куполом</p>
          <h1>Здесь нет нужной двери</h1>
          <p className="hero-copy">
            Путь оборвался где-то между стеклом, сменой и марсианским светом. Такой
            страницы в этом маршруте нет, но сам мир никуда не делся.
          </p>
          <p className="section-description">
            Можно вернуться к началу, открыть сезон или зайти в разделы, где история
            продолжается без сбоев.
          </p>
          <div className="not-found-actions">
            <Link className="secondary-link" to="/">
              На главную
            </Link>
            <Link className="secondary-link" to="/episodes">
              Читать сезон
            </Link>
            <Link className="secondary-link" to="/characters">
              Смотреть персонажей
            </Link>
          </div>
        </div>

        <div className="not-found-visual">
          <MediaImage
            image={lostRouteImage}
            className="not-found-visual-media"
            loading="eager"
            decoding="sync"
            sizes="(min-width: 1200px) 38vw, (min-width: 720px) 46vw, 100vw"
          />
        </div>
      </section>
    </div>
  );
}
