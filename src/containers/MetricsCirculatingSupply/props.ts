export type CirculatingMetrics = {
  circulatingSupply: number;
  date: string;
  totalSupply: number;
}[];

export type TrendItem = {
  name: string;
  data: {
    x: string;
    y: number;
  }[];
  color: string;
};

export type TabValue = "all" | "total_supply" | "circulating_supply";
export type TabMapping = Record<TabValue, TrendItem[]>;
