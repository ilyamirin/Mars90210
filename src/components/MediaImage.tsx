import type { IllustrationEntry } from '../content/types';

interface MediaImageProps {
  image: IllustrationEntry;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
}

export function MediaImage({
  image,
  className,
  loading = 'lazy',
  decoding = 'async',
  sizes,
}: MediaImageProps) {
  if (image.isPlaceholder) {
    return (
      <div className={className} data-placeholder="true" role="img" aria-label={image.alt}>
        <span>Иллюстрация появится позже</span>
      </div>
    );
  }

  const fallbackSrc = image.pngSrc ?? image.src;

  return (
    <picture className={className}>
      {image.avifSrc ? <source srcSet={image.avifSrc} type="image/avif" sizes={sizes} /> : null}
      <img
        src={fallbackSrc}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
}
