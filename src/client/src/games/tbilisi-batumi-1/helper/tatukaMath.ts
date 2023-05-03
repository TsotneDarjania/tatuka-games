export function getRandomFloat(min: number, max: number) {
  const decimals = 5;
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

export function calculatePercentage(percent: number, total: number) {
  return (total / 100) * percent;
}
