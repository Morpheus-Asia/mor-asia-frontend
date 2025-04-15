export type TabValue = "all" | "oneDay" | "oneMonth" | "oneWeek" | "oneYear";

export type TabMapping = "day" | "week" | "month" | "year" | "all";

export type MetricsItem = {
  date: string;
  priceUsd: number;
};

export type PriceHistoryMetrics = Record<TabValue, MetricsItem>;
