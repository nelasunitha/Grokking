const determineProfitFromLength = (costPerCut, salePrice, lengths, requiredLength) => {
  let totalCuts = 0;
  let totalUniformRods = 0;

  for (const sheet of lengths) {
      const rodFrequency = Math.floor(sheet / requiredLength);
      totalCuts += sheet % requiredLength === 0 ? rodFrequency - 1 : rodFrequency; // if it perfectly fits required length, cuts are one less than numOfRods
      totalUniformRods += rodFrequency;
  }

  return totalUniformRods * requiredLength * salePrice - totalCuts * costPerCut
}

const cuttingMetal = (costPerCut, salePrice, lengths) => {
  let maxProfit = -Infinity;
  for (let i = Math.max(...lengths); i > 0; i--) {
      const thisInstanceProfit = determineProfitFromLength(costPerCut, salePrice, lengths, i);
      maxProfit = Math.max(maxProfit, thisInstanceProfit);
  }

  return maxProfit;
}
console.log(cuttingMetal(1, 10, [26,103,59]))
