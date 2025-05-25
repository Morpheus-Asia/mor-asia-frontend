import { GenerateTableArgs } from "./props";

export const generateTableRows = (args: GenerateTableArgs) => {
  const { totalVirtualStakedUSD, morPrice, inputValue } = args;
  // Calculate multipliers based on dilution rates
  const calculateMultiplier = (days: number) => {
    const start = Math.floor(Date.now() / 1000); // Current time in unix timestamp
    const end = start + days * 24 * 60 * 60; // Add days converted to seconds

    // Constants from the formula
    const constant = 16.61327546;
    const epochStart = 1721908800;
    const timeScale = 484272000;

    // Calculate the tanh terms
    const startTerm = Math.tanh(2 * ((start - epochStart) / timeScale));
    const endTerm = Math.tanh(2 * ((end - epochStart) / timeScale));

    // Calculate the multiplier
    let multiplier = constant * (endTerm - startTerm);

    // Apply bounds
    multiplier = Math.max(1.0, Math.min(10.7, multiplier));

    return multiplier.toFixed(1) + "x";
  };

  // Convert totalVirtualStakedUSD from currency string to number
  const totalStakedUSD = parseFloat(
    totalVirtualStakedUSD.replace(/[^0-9.-]+/g, "")
  );

  const calculateRewardEstimate = (days: number, newInitialValue: number) => {
    // Calculate new total including the user's new stake
    const newTotalStaked = totalStakedUSD + newInitialValue;

    // Calculate the user's share of the new total pool
    const userShare = newInitialValue / newTotalStaked;

    // Calculate total accrual for the period in MOR
    let totalAccrualMOR = 0;
    const startDate = new Date("2024-02-08");
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate accrual for each day in the lock period
    for (let i = 0; i < days; i++) {
      // Calculate daily emissions for this specific day
      const dailyEmission = 14400 - (daysSinceStart + i) * 2.468994701;
      if (dailyEmission > 0) {
        // Calculate daily accrual (24% of daily emissions)
        const dailyAccrual = dailyEmission * 0.24;
        // Add this day's portion of accrual to total
        totalAccrualMOR += dailyAccrual * userShare;
      }
    }

    // Convert MOR accrual to USD using current MOR price
    const totalAccrualUSD = totalAccrualMOR * morPrice;

    // Add to initial value
    return newInitialValue + totalAccrualUSD;
  };

  return [
    {
      days: "7 Days",
      multiplier: calculateMultiplier(7),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(7).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        7,
        inputValue * Number(calculateMultiplier(7).replace("x", ""))
      ).toLocaleString()}`,
    },
    {
      days: "365 Days (1Y)",
      multiplier: calculateMultiplier(365),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(365).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        365,
        inputValue * Number(calculateMultiplier(365).replace("x", ""))
      ).toLocaleString()}`,
    },
    {
      days: "730 Days (2Y)",
      multiplier: calculateMultiplier(730),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(730).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        730,
        inputValue * Number(calculateMultiplier(730).replace("x", ""))
      ).toLocaleString()}`,
    },
    {
      days: "1095 Days (3Y)",
      multiplier: calculateMultiplier(1095),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(1095).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        1095,
        inputValue * Number(calculateMultiplier(1095).replace("x", ""))
      ).toLocaleString()}`,
    },
    {
      days: "1460 Days (4Y)",
      multiplier: calculateMultiplier(1460),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(1460).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        1460,
        inputValue * Number(calculateMultiplier(1460).replace("x", ""))
      ).toLocaleString()}`,
    },
    {
      days: "1825 Days (5Y)",
      multiplier: calculateMultiplier(1825),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(1825).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        1825,
        inputValue * Number(calculateMultiplier(1825).replace("x", ""))
      ).toLocaleString()}`,
    },
    {
      days: "2190 Days (6Y)",
      multiplier: calculateMultiplier(2190),
      newInitialValue: `$${(
        inputValue * Number(calculateMultiplier(2190).replace("x", ""))
      ).toLocaleString()}`,
      rewardEstimate: `$${calculateRewardEstimate(
        2190,
        inputValue * Number(calculateMultiplier(2190).replace("x", ""))
      ).toLocaleString()}`,
    },
  ];
};

export function nonLinearMap(sliderValue: number): number {
  if (sliderValue <= 30) {
    // $50 increments from 100 to 1600
    const stepSize = 50;
    const minAmount = 100;
    // Calculate raw amount
    const rawAmount = minAmount + (sliderValue / 30) * (30 * stepSize);
    // Snap to nearest multiple of stepSize
    return Math.round(rawAmount / stepSize) * stepSize;
  } else if (sliderValue <= 70) {
    // $500 increments from 1600 to 21600
    const stepSize = 500;
    const minAmount = 1600;
    const segmentLength = 40;
    const rawAmount =
      minAmount +
      ((sliderValue - 30) / segmentLength) * (segmentLength * stepSize);
    return Math.round(rawAmount / stepSize) * stepSize;
  } else {
    // $5000 increments from 21600 to 100000
    const stepSize = 5000;
    const minAmount = 21600;
    const segmentLength = 30;
    const rawAmount =
      minAmount +
      ((sliderValue - 70) / segmentLength) * (segmentLength * stepSize);
    return Math.round(rawAmount / stepSize) * stepSize;
  }
}
