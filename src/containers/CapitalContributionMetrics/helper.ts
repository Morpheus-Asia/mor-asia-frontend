import { GenerateTableArgs } from "./props";

export const generateTableRows = (args: GenerateTableArgs) => {
  const { totalVirtualStakedUSD, morPrice, inputValue } = args;

  const calculateMultiplier = (days: number) => {
    const start = Math.floor(Date.now() / 1000);
    const end = start + days * 24 * 60 * 60;

    const constant = 16.61327546;
    const epochStart = 1721908800;
    const timeScale = 484272000;

    const startTerm = Math.tanh(2 * ((start - epochStart) / timeScale));
    const endTerm = Math.tanh(2 * ((end - epochStart) / timeScale));

    let multiplier = constant * (endTerm - startTerm);
    multiplier = Math.max(1.0, Math.min(10.7, multiplier));

    return multiplier.toFixed(1) + "x";
  };

  const totalStakedUSD = parseFloat(
    totalVirtualStakedUSD.replace(/[^0-9.-]+/g, "")
  );

  const calculateRewardEstimate = (days: number, newInitialValue: number) => {
    const newTotalStaked = totalStakedUSD + newInitialValue;
    const userShare = newInitialValue / newTotalStaked;
    let totalAccrualMOR = 0;
    
    const startDate = new Date("2024-02-08");
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    for (let i = 0; i < days; i++) {
      const dailyEmission = 14400 - (daysSinceStart + i) * 2.468994701;
      if (dailyEmission > 0) {
        const dailyAccrual = dailyEmission * 0.24;
        totalAccrualMOR += dailyAccrual * userShare;
      }
    }

    const totalAccrualUSD = totalAccrualMOR * morPrice;
    return newInitialValue + totalAccrualUSD;
  };

  return [
    {
      days: "90d",
      multiplier: calculateMultiplier(90),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(90).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(90, inputValue * Number(calculateMultiplier(90).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      days: "1y",
      multiplier: calculateMultiplier(365),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(365).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(365, inputValue * Number(calculateMultiplier(365).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      days: "2y",
      multiplier: calculateMultiplier(730),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(730).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(730, inputValue * Number(calculateMultiplier(730).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      days: "3y",
      multiplier: calculateMultiplier(1095),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(1095).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(1095, inputValue * Number(calculateMultiplier(1095).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      days: "4y",
      multiplier: calculateMultiplier(1460),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(1460).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(1460, inputValue * Number(calculateMultiplier(1460).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      days: "5y",
      multiplier: calculateMultiplier(1825),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(1825).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(1825, inputValue * Number(calculateMultiplier(1825).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      days: "6y",
      multiplier: calculateMultiplier(2190),
      newInitialValue: `$${(inputValue * Number(calculateMultiplier(2190).replace("x", ""))).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      rewardEstimate: `+$${(calculateRewardEstimate(2190, inputValue * Number(calculateMultiplier(2190).replace("x", ""))) - inputValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
  ];
};

export function nonLinearMap(sliderValue: number): number {
  const min = 0.1;
  const max = 1000;

  const logMin = Math.log10(min);
  const logMax = Math.log10(max);

  const t = sliderValue / 100;

  const logValue = logMin + t * (logMax - logMin);
  const value = Math.pow(10, logValue);

  return parseFloat(value.toFixed(2));
}
