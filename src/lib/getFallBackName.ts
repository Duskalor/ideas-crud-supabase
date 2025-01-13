export const getFallBackName = (name: string) => {
  if (!name) {
    return 'NN';
  }
  const FallbackName = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');
  return FallbackName;
};
