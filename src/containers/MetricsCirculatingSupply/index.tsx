"use client";
import { Box, HStack, Tabs, Text, VStack } from "@chakra-ui/react";
import { map } from "lodash";
import moment from "moment";
import TotalAndCirculatingSupplyChart from "morpheus-asia/components/Charts/TotalAndCirculatignSupplyChart";
import MetricsBox from "morpheus-asia/components/MetricsBox";
import { useEffect, useState } from "react";
import { FaChartArea } from "react-icons/fa";
import { CirculatingMetrics, TabMapping, TabValue } from "./props";

const tabs = [
  {
    label: "ALL",
    value: "all",
  },
  {
    label: "TOTAL SUPPLY",
    value: "total_supply",
  },
  {
    label: "CIRCULATING SUPPLY",
    value: "circulating_supply",
  },
];

export const MetricsCirculatingSupply = () => {
  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<CirculatingMetrics>([]);
  const [value, setValue] = useState<TabValue>("all");

  // =============== EFFECTS
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metrics = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/total_and_circ_supply`
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

  const trend = [
    {
      name: "Total Supply",
      data: metrics.map((item) => ({
        x: moment(item.date, "DD/MM/YYYY").toISOString(), // Convert to ISO format
        y: item.totalSupply,
      })),
      color: "#82CA9D",
    },
    {
      name: "Circulating Supply",
      data: metrics.map((item) => ({
        x: moment(item.date, "DD/MM/YYYY").toISOString(),
        y: item.circulatingSupply,
      })),
      color: "#8884D8",
    },
  ];

  const tabMapping: TabMapping = {
    all: trend,
    total_supply: [trend[0]], // Only Total Supply
    circulating_supply: [trend[1]], // Only Circulating Supply
  };

  return (
    <MetricsBox
      height={"100%"}
      width={"100%"}
      isLoading={loading}
      skeletonProps={{
        height: 400,
      }}
      pb={"2.5rem"}
      background={{
        base: "transparent",
        md: "rgba(255,255,255,0.05)",
      }}
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
            <FaChartArea size={25} color="#00DC8D" />
            <Text color="#FFF" fontWeight={"bold"} fontSize={"1.25rem"}>
              Market Cap
            </Text>
          </HStack>
          <Tabs.Root
            border={{ base: "none", sm: "1px solid #00DC8D" }}
            borderColor={"primary.300"}
            borderRadius={8}
            variant={"subtle"}
            backgroundColor={"transparent"}
            colorPalette={"transparent"}
            size={"sm"}
            overflow={"hidden"}
            margin={{ base: "0 auto", lg: "0" }}
            value={value}
            onValueChange={(e) => setValue(e.value as TabValue)}
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
          {value === "all" && (
            <HStack
              justifyContent={"center"}
              alignItems={"center"}
              gap={5}
              width={"100%"}
              pt={{ base: 2, md: 0 }}
              pb={{ base: 5, md: 0 }}
              flexWrap={"wrap"}
            >
              <HStack justifyContent={"center"} alignItems={"center"}>
                <Box
                  background={"#82CA9D"}
                  borderRadius={"full"}
                  w={15}
                  h={15}
                ></Box>
                <Text color="#FFF" textTransform={"uppercase"}>
                  Total Supply
                </Text>
              </HStack>
              <HStack justifyContent={"center"} alignItems={"center"}>
                <Box
                  background={"#8884D8"}
                  borderRadius={"full"}
                  w={15}
                  h={15}
                ></Box>
                <Text color="#FFF" textTransform={"uppercase"}>
                  Circulating supply
                </Text>
              </HStack>
            </HStack>
          )}
          <TotalAndCirculatingSupplyChart data={tabMapping[value]} />
        </Box>
      </VStack>
    </MetricsBox>
  );
};
