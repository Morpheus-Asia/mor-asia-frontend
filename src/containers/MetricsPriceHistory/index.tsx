"use client";
import { Box, HStack, Tabs, Text, VStack } from "@chakra-ui/react";
import { map } from "lodash";
import { PriceHistoryLineChart } from "morpheus-asia/components/Charts/PriceHistoryLineChart";
import MetricsBox from "morpheus-asia/components/MetricsBox";
import { useEffect, useState } from "react";
import { MdOutlineInsertChart } from "react-icons/md";
import { PriceHistoryMetrics, TabMapping, TabValue } from "./props";

const tabs = [
  {
    label: "1D",
    value: "day",
  },
  {
    label: "1W",
    value: "week",
  },
  {
    label: "1M",
    value: "month",
  },
  {
    label: "1Y",
    value: "year",
  },
  {
    label: "ALL",
    value: "all",
  },
];

export const MetricsPriceHistory = () => {
  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<PriceHistoryMetrics>(
    {} as PriceHistoryMetrics
  );
  const [value, setValue] = useState<TabMapping>("day");

  // =============== VARIABLES
  const tabMapping: Record<TabMapping, TabValue> = {
    day: "oneDay",
    week: "oneWeek",
    month: "oneMonth",
    year: "oneYear",
    all: "all",
  };

  // =============== EFFECTS
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const currentTime = Date.now();
        const metrics = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/price/history?currentTime=${currentTime}`
        );
        const metricsData = await metrics.json();
        setMetrics(metricsData?.data);
      } catch (error) {
        console.error("MetricsTopMetricsError", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const formatData = (data: any) => {
    return {
      series: data?.map((item: any) => [
        item.date, // X-axis: Timestamp
        parseFloat(item.priceUsd).toFixed(2), // Y-axis: Rounded price
      ]),
    };
  };

  return (
    <MetricsBox
      height={"100%"}
      width={"100%"}
      isLoading={loading}
      skeletonProps={{
        height: 400,
      }}
      background={{
        base: "transparent",
        md: "rgba(255,255,255,0.05)",
      }}
      pb={{ base: "0", md: 5 }}
      px={{ base: 0, md: 6 }}
    >
      <VStack width={"100%"} alignItems={"flex-start"}>
        <HStack
          justifyContent={"space-between"}
          width={"100%"}
          pb={4}
          flexWrap={"wrap"}
          gap={6}
        >
          <HStack justifyContent={"flex-start"} gap={3}>
            <MdOutlineInsertChart size={30} color="#00DC8D" />
            <Text color="#FFF" fontWeight={"bold"} fontSize={"1.25rem"}>
              Price History
            </Text>
          </HStack>
          <Tabs.Root
            border={{ base: "none", sm: "1px solid #00DC8D" }}
            borderRadius={8}
            variant={"subtle"}
            backgroundColor={"transparent"}
            colorPalette={"transparent"}
            margin={{ base: "0 auto", lg: "0" }}
            size={"sm"}
            overflow={"hidden"}
            value={value}
            onValueChange={(e) => setValue(e.value as TabMapping)}
            overflowX={{ base: "scroll", lg: "hidden" }}
          >
            <Tabs.List borderRadius={8}>
              {map(tabs, (tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  paddingInline={8}
                  paddingBlock={4}
                  _selected={{ bg: "primary.300" }}
                >
                  <Text color="#FFF" fontWeight={"semibold"}>
                    {tab.label}
                  </Text>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </HStack>
        <Box width={"100%"} height={"100%"}>
          <PriceHistoryLineChart
            type={value}
            data={formatData(metrics?.[tabMapping[value]])}
          />
        </Box>
      </VStack>
    </MetricsBox>
  );
};
