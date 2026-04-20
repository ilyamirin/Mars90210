function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, '');
}

export function withBaseAssetPath(assetPath: string) {
  if (!assetPath) {
    return '';
  }

  const normalizedAssetPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const normalizedBase = trimSlashes(import.meta.env.BASE_URL || '/');

  if (!normalizedBase) {
    return `/${normalizedAssetPath}`;
  }

  return `/${normalizedBase}/${normalizedAssetPath}`;
}
