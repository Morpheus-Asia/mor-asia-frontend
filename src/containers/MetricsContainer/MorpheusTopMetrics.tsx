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
import PercentageChip from "morpheus-asia/components/PercentageChip";
import { useEffect, useState } from "react";
import MORLogo from "morpheus-asia/Image/MOR.png";
import moment from "moment";
import { getDictionary } from "morpheus-asia/i18n";

type Props = {
  locale?: string;
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const MetricsTopMetrics: React.FC<Props> = (props) => {
  const { locale } = props;
  // =============== LOCALE
  const metricsPageLocale = getDictionary(locale)?.metricsPage;
  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({} as any);

  // =============== EFFECTS
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const currentTime = Date.now();
        const metrics = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/morpheus-api/data?currentTime=${currentTime}`
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
    {
      title: metricsPageLocale?.circulatingSupply,
      value: `${metricsAsset?.supply} MOR`,
    },
    {
      title: metricsPageLocale?.totalSupply,
      value: `${metricsAsset?.maxSupply} MOR`,
    },
    {
      title: metricsPageLocale?.circulatingMarketCap,
      value: `$ ${metricsAsset?.circulatingSupply}`,
    },
    {
      title: metricsPageLocale?.totalMarketCap,
      value: `$ ${metricsAsset?.totalSupply}`,
    },
  ];

  const formattedData = {
    series: metricsHistory?.map((item: any) => [
      item.time, // X-axis: Timestamp
      parseFloat(item.priceUsd).toFixed(2), // Y-axis: Rounded price
    ]),
  };
  const now = moment.utc();

  // Format: DD MMM YYYY (e.g., 06 APR 2025)
  const formattedDate = `${now.format("DD MMM YYYY HH:mm").toUpperCase()} UTC`;

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
                      {metricsPageLocale?.morpheusAI}
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
                <Text>{metricsPageLocale?.past7Days}</Text>
                <Text>
                  {metricsPageLocale?.lastUpdated}: {formattedDate}
                </Text>
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
