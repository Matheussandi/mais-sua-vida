export function WeightConverter(weightString: string) {
  const weightInKg = parseFloat(weightString);
  return weightInKg.toFixed(2);
}
