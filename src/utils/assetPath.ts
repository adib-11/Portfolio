export const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL;
  if (!base) return path;
  
  // If the path already has the base prefix (can happen in some cases), return it
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }
  
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${cleanBase}/${cleanPath}`;
};
