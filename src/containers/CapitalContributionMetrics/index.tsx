"use client";
import { Box, Text, VStack } from "@chakra-ui/react";
import { getDictionary } from "morpheus-asia/i18n";
import React, { useState, useEffect } from "react";
import CapitalPool from "./CapitalPool";
import Forcast from "./Forecast";
import Divider from "morpheus-asia/components/Divider";
import { useMorMetrics } from "morpheus-asia/app/screens/MetricsScreen/MORMetricsProvider/context";
import { CapitalPoolData } from "./props";

type Props = {
  locale?: string;
};

export const CapitalContributionMetrics: React.FC<Props> = (props) => {
  const { locale } = props;
  // =============== LOCALE
  const metricsPageLocale = getDictionary(locale)?.metricsPage;

  // =============== HOOKS
  const { loading: morMetricsLoading, metrics: morMetrics } = useMorMetrics();

  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [totalVirtualStaked, setTotalVirtualStaked] = useState<string>("");
  const [totalVirtualStakedUSD, setTotalVirtualStakedUSD] =
    useState<string>("");
  const [capitalPoolData, setCapitalPoolData] = useState<CapitalPoolData>(
    {} as CapitalPoolData
  );

  // =============== EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsResponse = await fetch("/api/morpheus-api/capitalData");
        const metricsData = await metricsResponse.json();
        setCapitalPoolData(metricsData?.data || {});
        const virtualStakedResponse = await fetch(`/api/cap_virtual_deposited`);
        const virtualStakedData = await virtualStakedResponse.json();
        const totalVirtualDepositedData =
          virtualStakedData.data.totalVirtualDeposited;
        const ethPrice = metricsData?.data?.asset?.priceUsd;
        setTotalVirtualStaked(`${totalVirtualDepositedData} stETH`);
        if (ethPrice) {
          const usdValue = (
            Number(totalVirtualDepositedData) * ethPrice
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          setTotalVirtualStakedUSD(usdValue);
        }
      } catch {
        setTotalVirtualStaked("-");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // =============== VARIABLES
  const asset = capitalPoolData?.asset;
  const morAsset = morMetrics?.asset || {};
  const metrics = capitalPoolData?.metrics || {};
  const history = capitalPoolData?.history || [];

  const chartData = !history.length
    ? { series: [] }
    : {
        series: history.map((item) => [
          item.time,
          parseFloat(item.priceUsd).toFixed(2),
        ]),
      };

  return (
    <VStack width="100%" alignItems="flex-start" gap={6} pt={5}>
      <Divider />
      <Text color="#FFF" fontWeight={"bold"} fontSize={"2xl"}>
        {metricsPageLocale?.capitalContributionMetrics}
      </Text>
      <Box width="100%">
        <CapitalPool
          loading={loading || morMetricsLoading}
          metricsPageLocale={metricsPageLocale}
          price={asset?.priceUsd}
          chartData={chartData}
          dailyEmission={metrics?.dailyEmission}
          balanceValue={morAsset?.balance}
          dailyAccrual={metrics?.dailyAccrual}
          totalLockedValue={metrics?.totalLockedValue}
          percent={asset?.changePercent24Hr}
        />
      </Box>
      <Box width="100%">
        <Forcast
          loading={loading || morMetricsLoading}
          metricsPageLocale={metricsPageLocale}
          totalVirtualStaked={totalVirtualStaked}
          totalVirtualStakedUSD={totalVirtualStakedUSD}
          morPrice={morAsset?.priceUsd}
          ethPrice={asset?.priceUsd}
        />
      </Box>
    </VStack>
  );
};

export default CapitalContributionMetrics;
