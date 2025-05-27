"use client";
import { Box, Text, VStack } from "@chakra-ui/react";
import { getDictionary } from "morpheus-asia/i18n";
import React, { useState, useMemo, useEffect } from "react";
import CapitalPool from "./CapitalPool";
import Forcast from "./Forecast";
import Divider from "morpheus-asia/components/Divider";

type Props = {
  locale?: string;
};

export const CapitalContributionMetrics: React.FC<Props> = (props) => {
  const { locale } = props;
  // =============== LOCALE
  const metricsPageLocale = getDictionary(locale)?.metricsPage;

  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [totalVirtualStaked, setTotalVirtualStaked] = useState<string>("");
  const [totalVirtualStakedUSD, setTotalVirtualStakedUSD] =
    useState<string>("");
  const [ethPrice, setEthPrice] = useState<string>("");
  const [morPrice, setMorPrice] = useState<number>(0);
  const [totalLocked, setTotalLocked] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [ethPriceHistory, setEthPriceHistory] = useState<
    Array<{ priceUsd: string; time: number }>
  >([]);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);

  // =============== EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = Date.now();
        
        // Fetch all metrics data in one call
        const metricsResponse = await fetch(`/api/morpheus-api/metrics-data?currentTime=${currentTime}`);
        const metricsData = await metricsResponse.json();
        
        if (metricsData?.data) {
          // Handle ETH price history
          if (metricsData.data.ethHistory?.data) {
            setEthPriceHistory(metricsData.data.ethHistory.data);

            // Calculate price change percentage
            if (metricsData.data.ethHistory.data.length >= 2) {
              const latestPrice = parseFloat(
                metricsData.data.ethHistory.data[metricsData.data.ethHistory.data.length - 1].priceUsd
              );
              const previousPrice = parseFloat(
                metricsData.data.ethHistory.data[metricsData.data.ethHistory.data.length - 2].priceUsd
              );
              const percentChange =
                ((latestPrice - previousPrice) / previousPrice) * 100;
              setPriceChangePercent(Number(percentChange.toFixed(2)));
            }
          }

          // Handle ETH price
          if (metricsData.data.ethPrice?.data?.priceUsd) {
            setEthPrice(`$${Number(metricsData.data.ethPrice.data.priceUsd).toFixed(2)}`);
          }

          // Handle total locked
          if (metricsData.data.totalDeposited?.data?.totalDeposited) {
            const formattedValue = (
              Number(metricsData.data.totalDeposited.data.totalDeposited) / 1e18
            ).toFixed(4);
            setTotalLocked(`${formattedValue} ETH`);
          }

          // Handle MOR metrics
          if (metricsData.data.morMetrics?.data?.asset) {
            setMorPrice(Number(metricsData.data.morMetrics.data.asset.priceUsd));

            // Calculate balance (24% of total supply)
            if (metricsData.data.morMetrics.data.asset.maxSupply) {
              // Remove commas before converting to number
              const cleanSupply = metricsData.data.morMetrics.data.asset.maxSupply.replace(
                /,/g,
                ""
              );
              const totalSupply = Number(cleanSupply);
              if (!isNaN(totalSupply)) {
                const balanceValue = (totalSupply * 0.24).toLocaleString(
                  "en-US",
                  {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 4,
                  }
                );
                setBalance(`${balanceValue} MOR`);
              } else {
                console.error(
                  "Invalid total supply value:",
                  metricsData.data.morMetrics.data.asset.maxSupply
                );
                setBalance("-");
              }
            } else {
              console.error(
                "Missing maxSupply in API response:",
                metricsData.data.morMetrics.data.asset
              );
              setBalance("-");
            }
          }
        }

        // Fetch total virtual staked (keeping this separate as requested)
        const virtualStakedResponse = await fetch(`/api/cap_virtual_deposited`);
        const virtualStakedData = await virtualStakedResponse.json();
        if (
          virtualStakedData &&
          virtualStakedData.data &&
          virtualStakedData.data.totalVirtualDeposited
        ) {
          const formattedValue = (
            Number(virtualStakedData.data.totalVirtualDeposited) / 1e18
          ).toFixed(4);
          setTotalVirtualStaked(`${formattedValue} stETH`);

          // Calculate USD value if ETH price is available
          if (metricsData?.data?.ethPrice?.data?.priceUsd) {
            const ethPriceUsd = Number(metricsData.data.ethPrice.data.priceUsd);
            const usdValue = (
              Number(formattedValue) * ethPriceUsd
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            setTotalVirtualStakedUSD(usdValue);
          }
        } else {
          setTotalVirtualStaked("-");
        }
      } catch (error) {
        setTotalVirtualStaked("-");
        setEthPrice("-");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // =============== VARIABLES
  const chartData = useMemo(() => {
    if (!ethPriceHistory.length) return { series: [] };

    return {
      series: ethPriceHistory.map((item) => [
        item.time,
        parseFloat(item.priceUsd).toFixed(2),
      ]),
    };
  }, [ethPriceHistory]);

  // Calculate daily emissions
  const calculateDailyEmissions = useMemo(() => {
    const startDate = new Date("2024-02-08");
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const initialEmissions = 14400;
    const dailyDecline = 2.468994701;
    const currentEmissions = initialEmissions - daysSinceStart * dailyDecline;
    return currentEmissions.toFixed(4);
  }, []);

  // Calculate daily accrual (24% of daily emissions)
  const dailyAccrualValue = useMemo(() => {
    return (Number(calculateDailyEmissions) * 0.24).toFixed(4);
  }, [calculateDailyEmissions]);

  // Placeholder values
  const price = ethPrice || "$3252.23";
  const percent = priceChangePercent;
  const dailyAccrual = `${dailyAccrualValue} MOR`;

  return (
    <VStack width="100%" alignItems="flex-start" gap={6} pt={5}>
      <Divider />
      <Text color="#FFF" fontWeight={"bold"} fontSize={"2xl"}>
        {metricsPageLocale?.capitalContributionMetrics}
      </Text>
      <Box width="100%">
        <CapitalPool
          loading={loading}
          metricsPageLocale={metricsPageLocale}
          price={price}
          chartData={chartData}
          calculateDailyEmissions={calculateDailyEmissions}
          balanceValue={balance}
          dailyAccrual={dailyAccrual}
          totalLockedValue={totalLocked}
          percent={percent}
        />
      </Box>
      <Box width="100%">
        <Forcast
          loading={loading}
          metricsPageLocale={metricsPageLocale}
          totalVirtualStaked={totalVirtualStaked}
          totalVirtualStakedUSD={totalVirtualStakedUSD}
          morPrice={morPrice}
          ethPrice={ethPrice}
        />
      </Box>
    </VStack>
  );
};

export default CapitalContributionMetrics;
