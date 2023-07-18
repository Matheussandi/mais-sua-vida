export function HeightConverter(heightCm: string) {
  const height = Number(heightCm);
  const heightMeters = (height / 100).toFixed(2);
  return heightMeters;
}
