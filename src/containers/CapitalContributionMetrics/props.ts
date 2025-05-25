import { ChartProps } from "morpheus-asia/components/Charts/props";

export type CapitalPoolProps = {
  loading: boolean;
  metricsPageLocale: Record<string, any>;
  price: string;
  percent: number;
  chartData: ChartProps["data"];
  calculateDailyEmissions: string;
  balanceValue: string;
  dailyAccrual: string;
  totalLockedValue: string;
};

export type ForcastProps = {
  metricsPageLocale: Record<string, any>;
  totalVirtualStaked: string;
  totalVirtualStakedUSD: string;
  morPrice: number;
  loading: boolean;
};

export type GenerateTableArgs = {
  totalVirtualStakedUSD: string;
  morPrice: number;
  inputValue: number;
};
