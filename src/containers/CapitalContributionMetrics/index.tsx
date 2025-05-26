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
        // Fetch ETH price history
        const ethHistoryResponse = await fetch(`/api/eth/history`);
        const ethHistoryData = await ethHistoryResponse.json();
        if (ethHistoryData && ethHistoryData.data) {
          setEthPriceHistory(ethHistoryData.data);

          // Calculate price change percentage
          if (ethHistoryData.data.length >= 2) {
            const latestPrice = parseFloat(
              ethHistoryData.data[ethHistoryData.data.length - 1].priceUsd
            );
            const previousPrice = parseFloat(
              ethHistoryData.data[ethHistoryData.data.length - 2].priceUsd
            );
            const percentChange =
              ((latestPrice - previousPrice) / previousPrice) * 100;
            setPriceChangePercent(Number(percentChange.toFixed(2)));
          }
        }

        // Fetch total virtual staked
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
          const ethPriceResponse = await fetch(`/api/eth/price`);
          const ethPriceData = await ethPriceResponse.json();
          if (ethPriceData && ethPriceData.data && ethPriceData.data.priceUsd) {
            const ethPriceUsd = Number(ethPriceData.data.priceUsd);
            const usdValue = (
              Number(formattedValue) * ethPriceUsd
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            setTotalVirtualStakedUSD(usdValue);
          }
        } else {
          console.error(
            "Unexpected API response structure:",
            virtualStakedData
          );
          setTotalVirtualStaked("-");
        }

        // Fetch total locked
        const totalLockedResponse = await fetch(`/api/total_deposited`);
        const totalLockedData = await totalLockedResponse.json();
        if (
          totalLockedData &&
          totalLockedData.data &&
          totalLockedData.data.totalDeposited
        ) {
          const formattedValue = (
            Number(totalLockedData.data.totalDeposited) / 1e18
          ).toFixed(4);
          setTotalLocked(`${formattedValue} ETH`);
        } else {
          console.error(
            "Unexpected total locked API response structure:",
            totalLockedData
          );
          setTotalLocked("-");
        }

        // Fetch ETH price
        const ethPriceResponse = await fetch(`/api/eth/price`);
        const ethPriceData = await ethPriceResponse.json();
        if (ethPriceData && ethPriceData.data && ethPriceData.data.priceUsd) {
          setEthPrice(`$${Number(ethPriceData.data.priceUsd).toFixed(2)}`);
        } else {
          console.error(
            "Unexpected ETH price API response structure:",
            ethPriceData
          );
          setEthPrice("-");
        }

        // Fetch MOR price and total supply
        const currentTime = Date.now();
        const morMetricsResponse = await fetch(
          `/api/morpheus-api/data?currentTime=${currentTime}`
        );
        const morMetricsData = await morMetricsResponse.json();
        if (morMetricsData?.data?.asset) {
          setMorPrice(Number(morMetricsData.data.asset.priceUsd));

          // Calculate balance (24% of total supply)
          if (morMetricsData.data.asset.maxSupply) {
            // Remove commas before converting to number
            const cleanSupply = morMetricsData.data.asset.maxSupply.replace(
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
                morMetricsData.data.asset.maxSupply
              );
              setBalance("-");
            }
          } else {
            console.error(
              "Missing maxSupply in API response:",
              morMetricsData.data.asset
            );
            setBalance("-");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
