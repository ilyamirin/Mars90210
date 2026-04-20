import type { IllustrationEntry } from '../content/types';
import { MediaImage } from './MediaImage';

export function IllustrationFigure({ image }: { image: IllustrationEntry }) {
  return (
    <figure className="illustration-figure">
      <MediaImage
        image={image}
        className="illustration-figure-media"
        loading="eager"
        decoding="sync"
        sizes="(min-width: 1200px) 28rem, 100vw"
      />
    </figure>
  );
}
