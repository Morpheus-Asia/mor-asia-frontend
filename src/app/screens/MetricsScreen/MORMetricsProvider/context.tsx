"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type MORMetricsProviderProps = {
  children: ReactNode;
};

type MORMetricsContextType = {
  metrics: {
    asset: {
      balance: string;
      changePercent24Hr: number;
      circulatingSupply: string;
      explorer: string;
      id: string;
      marketCapUsd: string;
      maxSupply: string;
      name: string;
      priceUsd: number;
      rank: string;
      supply: string;
      symbol: string;
      totalSupply: string;
      volumeUsd24Hr: string;
    };
    history: {
      priceUsd: string;
      time: number;
      date: string;
      circulatingSupply: string;
    }[];
  };
  loading: boolean;
  refetch: () => void;
};

const MORMetricsContext = createContext<MORMetricsContextType | undefined>(
  undefined
);

export const MORMetricsProvider: React.FC<MORMetricsProviderProps> = (
  props
) => {
  const { children } = props;
  const [metrics, setMetrics] = useState(
    {} as MORMetricsContextType["metrics"]
  );
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const currentTime = Date.now();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/morpheus-api/data?currentTime=${currentTime}`
      );
      const data = await res.json();
      setMetrics(data?.data || {});
    } catch (error) {
      console.error("MetricsTopMetricsError", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <MORMetricsContext.Provider
      value={{ metrics, loading, refetch: fetchMetrics }}
    >
      {children}
    </MORMetricsContext.Provider>
  );
};
export const useMorMetrics = () => {
  const context = useContext(MORMetricsContext);
  if (context === undefined) {
    throw new Error("useMetrics must be used within a MetricsProvider");
  }
  return context;
};
