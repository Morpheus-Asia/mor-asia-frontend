"use client";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { map } from "lodash";
import QuickView24HrLineChart from "morpheus-asia/components/Charts/QuickViewLineChart";
import MetricsBox from "morpheus-asia/components/MetricsBox";
import MetricsDisplay from "morpheus-asia/components/MetricsDisplay";
import { useEffect, useState } from "react";
import MORLogo from "morpheus-asia/Image/MOR.png";
import PercentageChip from "./Chip";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const MetricsTopMetrics: React.FC = () => {
  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({} as any);

  // =============== EFFECTS
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const currentTime = Date.now();
        const metrics = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/metrics?currentTime=${currentTime}`
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

  // =============== VARIABLES
  const metricsAsset = metrics?.asset;
  const metricsHistory = metrics?.history;
  const metricsBoxData = [
    { title: "Circulating Supply", value: `${metricsAsset?.supply} MOR` },
    {
      title: "Total Supply",
      value: `${metricsAsset?.maxSupply} MOR`,
    },
    {
      title: "Circulating Supply market cap",
      value: `$ ${metricsAsset?.circulatingSupply}`,
    },
    {
      title: "total supply market cap",
      value: `$ ${metricsAsset?.totalSupply}`,
    },
  ];

  const formattedData = {
    series: metricsHistory?.map((item: any) => [
      item.time, // X-axis: Timestamp
      parseFloat(item.priceUsd).toFixed(2), // Y-axis: Rounded price
    ]),
  };
  const now = new Date();
  const pad = (num: number) => num.toString().padStart(2, "0"); // Ensures two-digit format

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1); // Months are zero-based
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  // =============== RENDER FUNCTIONS
  const renderContent = () => {
    return (
      <>
        <GridItem rowSpan={{ md: 4, lg: 2 }} width={"100%"} height={"100%"}>
          <MetricsBox
            height={"100%"}
            width="100%"
            paddingBottom={0}
            isLoading={loading}
            skeletonProps={{ height: 320 }}
          >
            <VStack
              justifyContent={"space-between"}
              height={"100%"}
              width={"100%"}
              alignItems={"flex-start"}
              pb={3}
            >
              <HStack alignItems={"flex-start"} gap={6}>
                <Box>
                  <Image src={MORLogo.src} alt="mor" />
                </Box>
                <VStack alignItems={"flex-start"} gap={0}>
                  <HStack alignItems={"center"}>
                    <Text color="#FFF" fontWeight={"bold"} fontSize={"1.25rem"}>
                      Morpheus AI
                    </Text>
                    <Text color={"#A2A3A6"} fontSize={".875rem"}>
                      MOR/USD
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"} gap={4}>
                    <Text
                      color="#FFF"
                      fontWeight={"extrabold"}
                      fontSize={"2.15rem"}
                    >
                      ${metricsAsset?.priceUsd}
                    </Text>
                    {metricsAsset?.changePercent24Hr && (
                      <PercentageChip value={metricsAsset?.changePercent24Hr} />
                    )}
                  </HStack>
                </VStack>
              </HStack>
              <Stack w={"100%"} h={"100%"}>
                <QuickView24HrLineChart
                  colors={["#00DC8D"]}
                  data={formattedData}
                />
              </Stack>
              <VStack
                color="#A2A3A6"
                alignItems={"flex-start"}
                gap={0}
                fontSize={".8rem"}
              >
                <Text>Last 7 Days Price History</Text>
                <Text>Last Updated: {formattedDate}</Text>
              </VStack>
            </VStack>
          </MetricsBox>
        </GridItem>
        {map(metricsBoxData, (data, index) => (
          <GridItem
            key={index}
            colSpan={{ md: index === 2 || index === 3 ? 2 : 1, lg: 1 }}
            rowSpan={{ md: 2, lg: 1 }}
            height={"100%"}
          >
            <MetricsBox height={"100%"} isLoading={loading}>
              <MetricsDisplay title={data.title} value={data.value} />
            </MetricsBox>
          </GridItem>
        ))}
      </>
    );
  };

  // =============== VIEWS
  return (
    <Grid
      gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
      width="100%"
      gap={5}
      height={"100%"}
    >
      {renderContent()}
    </Grid>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default MetricsTopMetrics;
