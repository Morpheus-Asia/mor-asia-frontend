import { ChartProps } from "morpheus-asia/components/Charts/props";

export type CapitalPoolProps = {
  loading: boolean;
  metricsPageLocale: Record<string, any>;
  price: number;
  percent: number;
  chartData: ChartProps["data"];
  dailyEmission: string;
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
  ethPrice: number;
};

export type GenerateTableArgs = {
  totalVirtualStakedUSD: string;
  morPrice: number;
  inputValue: number;
};

export type CapitalPoolData = {
  asset: {
    changePercent24Hr: number;
    priceUsd: number;
  };
  history: {
    priceUsd: string;
    date: string;
    time: number;
  }[];
  metrics: {
    dailyEmission: string;
    dailyAccrual: string;
    totalLockedValue: string;
  };
};
