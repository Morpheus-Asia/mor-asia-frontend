import { HStack, VStack, Image, Text, Box, Grid } from "@chakra-ui/react";
import QuickView24HrLineChart from "morpheus-asia/components/Charts/QuickViewLineChart";
import MetricsBox from "morpheus-asia/components/MetricsBox";
import PercentageChip from "morpheus-asia/components/PercentageChip";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import StethLogo from "morpheus-asia/Image/ETH.png";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaLandmark } from "react-icons/fa";
import { CapitalPoolProps } from "./props";
import Divider from "morpheus-asia/components/Divider";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const CapitalPool: React.FC<CapitalPoolProps> = (props) => {
  const {
    loading,
    metricsPageLocale,
    price,
    percent,
    chartData,
    calculateDailyEmissions,
    balanceValue,
    dailyAccrual,
    totalLockedValue,
  } = props;
  // =============== HOOKS

  // =============== STATE

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES

  // =============== RENDER FUNCTIONS

  // =============== VIEWS
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
      px={0}
    >
      <VStack width="100%">
        <HStack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
          pb={2}
          px={{ base: 0, md: 6 }}
        >
          <HStack alignItems="center" gap={1} flex={1}>
            <Image
              src={StethLogo.src}
              alt="stETH"
              objectFit={"contain"}
              width={"75px"}
              height={"75px"}
            />
            <VStack alignItems="flex-start" gap={0}>
              <HStack alignItems="center" gap={2}>
                <Text color="#FFF" fontWeight="bold" fontSize="xl">
                  stETH
                </Text>
                <Text color="#A2A3A6" fontSize="sm">
                  {metricsPageLocale?.ethUsd}
                </Text>
              </HStack>
              <HStack alignItems="center" gap={4}>
                <Text color="#FFF" fontWeight="extrabold" fontSize="2.15rem">
                  {price}
                </Text>
                <PercentageChip value={percent} />
              </HStack>
            </VStack>
          </HStack>
          <VStack gap={1} flex="end">
            <QuickView24HrLineChart
              colors={["#00DC8D"]}
              data={chartData}
              height={"70px"}
            />
            <Text color="#A2A3A6" fontSize="xs" textAlign="center" width="100%">
              {metricsPageLocale?.oneDayInterval}
            </Text>
          </VStack>
        </HStack>
        <Divider />
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 6, md: 8 }}
          py={5}
          width={"100%"}
          alignItems={"center"}
          justifyItems={"center"}
        >
          <VStack alignItems="flex-start" gap={0}>
            <HStack>
              <Text
                color="#FFF"
                fontWeight="semibold"
                fontSize="sm"
                opacity={0.8}
                textTransform="uppercase"
              >
                {metricsPageLocale?.initialDailyEmissions}
              </Text>
              <Tooltip
                content={metricsPageLocale?.tooltips?.initialDailyEmissions}
                positioning={{ placement: "top" }}
                showArrow
                openDelay={0}
                closeDelay={0}
              >
                <Box cursor="pointer">
                  <IoHelpCircleOutline color="#A2A3A6" size={16} />
                </Box>
              </Tooltip>
            </HStack>
            <Text color="#FFF" fontWeight="bold" fontSize="3xl">
              14,400 MOR
            </Text>
          </VStack>

          <VStack alignItems="flex-start" gap={0}>
            <HStack>
              <Text
                color="#FFF"
                fontWeight="semibold"
                fontSize="sm"
                opacity={0.8}
                textTransform="uppercase"
              >
                {metricsPageLocale?.dailyEmissionsToday}
              </Text>
              <Tooltip
                content={metricsPageLocale?.tooltips?.dailyEmissionsToday}
                positioning={{ placement: "top" }}
                showArrow
                openDelay={0}
                closeDelay={0}
              >
                <Box cursor="pointer">
                  <IoHelpCircleOutline color="#A2A3A6" size={16} />
                </Box>
              </Tooltip>
            </HStack>
            <Text color="#FFF" fontWeight="bold" fontSize="3xl">
              {calculateDailyEmissions} MOR
            </Text>
          </VStack>
        </Grid>
        <VStack px={{ base: 0, md: 6 }} width="100%">
          <Box
            width="100%"
            borderRadius={8}
            background="rgba(255,255,255,0.05)"
            px={{ base: 4, md: 10 }}
            py={{ base: 4, md: 5 }}
            display="flex"
            flexDirection="column"
            gap={6}
          >
            <HStack gap={4}>
              <FaLandmark color="#00DC8D" size={25} />
              <Text color="#FFF" fontWeight="bold" fontSize="2xl">
                {metricsPageLocale?.capitalPool} (ID: 0)
              </Text>
            </HStack>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={{ base: 6, md: "5%" }}
              width="100%"
              justifyContent="space-between"
            >
              <VStack alignItems="flex-start" gap={0}>
                <HStack>
                  <Text
                    color="#FFF"
                    fontWeight="semibold"
                    fontSize="sm"
                    opacity={0.8}
                    textTransform="uppercase"
                  >
                    {metricsPageLocale?.balance}
                  </Text>
                  <Tooltip
                    content={metricsPageLocale?.tooltips?.balance}
                    positioning={{ placement: "top" }}
                    showArrow
                    openDelay={0}
                    closeDelay={0}
                  >
                    <Box cursor="pointer">
                      <IoHelpCircleOutline color="#A2A3A6" size={16} />
                    </Box>
                  </Tooltip>
                </HStack>
                <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                  {balanceValue}
                </Text>
              </VStack>
              <VStack alignItems="flex-start" gap={0}>
                <HStack>
                  <Text
                    color="#FFF"
                    fontWeight="semibold"
                    fontSize="sm"
                    opacity={0.8}
                    textTransform="uppercase"
                  >
                    {metricsPageLocale?.dailyAccrual}
                  </Text>
                  <Tooltip
                    content={metricsPageLocale?.tooltips?.dailyAccrual}
                    positioning={{ placement: "top" }}
                    showArrow
                    openDelay={0}
                    closeDelay={0}
                  >
                    <Box cursor="pointer">
                      <IoHelpCircleOutline color="#A2A3A6" size={16} />
                    </Box>
                  </Tooltip>
                </HStack>
                <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                  {dailyAccrual}
                </Text>
              </VStack>
              <VStack alignItems="flex-start" gap={0}>
                <HStack>
                  <Text
                    color="#FFF"
                    fontWeight="semibold"
                    fontSize="sm"
                    opacity={0.8}
                    textTransform="uppercase"
                  >
                    {metricsPageLocale?.totalLocked}
                  </Text>
                  <Tooltip
                    content={metricsPageLocale?.tooltips?.totalLocked}
                    positioning={{ placement: "top" }}
                    showArrow
                    openDelay={0}
                    closeDelay={0}
                  >
                    <Box cursor="pointer">
                      <IoHelpCircleOutline color="#A2A3A6" size={16} />
                    </Box>
                  </Tooltip>
                </HStack>
                <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                  {totalLockedValue}
                </Text>
              </VStack>
            </Grid>
          </Box>
        </VStack>
      </VStack>
    </MetricsBox>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default CapitalPool;
