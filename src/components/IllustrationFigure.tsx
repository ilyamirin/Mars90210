export function IllustrationFigure({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="illustration-figure">
      <img src={src} alt={alt} />
    </figure>
  );
}
