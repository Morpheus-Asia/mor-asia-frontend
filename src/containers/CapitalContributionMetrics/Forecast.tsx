import { Box, Grid, HStack, Slider, Text, VStack } from "@chakra-ui/react";
import { MdOutlineAutoGraph } from "react-icons/md";
import { generateTableRows, nonLinearMap } from "./helper";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import { useState } from "react";
import { IoHelpCircleOutline } from "react-icons/io5";
import { ForcastProps } from "./props";
import MetricsBox from "morpheus-asia/components/MetricsBox";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Forcast: React.FC<ForcastProps> = (props) => {
  const {
    metricsPageLocale,
    totalVirtualStaked,
    totalVirtualStakedUSD,
    morPrice,
    loading,
    ethPrice,
  } = props;
  // =============== HOOKS

  // =============== STATE
  const [value, setValue] = useState([0]);
  const [finalValue, setFinalValue] = useState([0]);

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES
  const ethPriceNumber = parseFloat(ethPrice.replace("$", ""));
  console.log("eth", ethPriceNumber);

  const mappedValue = nonLinearMap(value[0]);
  const finalMappedValue = nonLinearMap(finalValue[0]) * ethPriceNumber;
  console.log("finalMappedValue", finalMappedValue);

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
      pb={{ base: "0", md: 5 }}
      background={{
        base: "transparent",
        md: "rgba(255,255,255,0.05)",
      }}
      px={{ base: 0, md: 6 }}
    >
      <VStack width="100%">
        <HStack
          gap={2}
          mb={4}
          justifyContent={"center"}
          alignSelf={"flex-start"}
        >
          <MdOutlineAutoGraph color="#00DC8D" size={28} />
          <Text color="#FFF" fontWeight="bold" fontSize="xl">
            {metricsPageLocale?.stakingMorRewardsForecast}
          </Text>
        </HStack>

        <VStack gap={6} alignItems="flex-start" width="100%">
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
            gap={8}
            width="100%"
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
                  {metricsPageLocale?.totalVirtualStakedSeth}
                </Text>
                <Tooltip
                  content={metricsPageLocale?.tooltips?.totalVirtualStaked}
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
                {totalVirtualStaked}
              </Text>
            </VStack>

            <VStack alignItems="flex-start" gap={0}>
              <Text
                color="#FFF"
                fontWeight="semibold"
                fontSize="sm"
                opacity={0.8}
                textTransform="uppercase"
              >
                {metricsPageLocale?.valueInUsd}
              </Text>
              {totalVirtualStakedUSD && (
                <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                  {totalVirtualStakedUSD}
                </Text>
              )}
            </VStack>

            <VStack alignItems="flex-start" width="100%">
              <Text
                color="#FFF"
                fontWeight="semibold"
                fontSize="sm"
                opacity={0.8}
                textTransform="uppercase"
              >
                {metricsPageLocale?.sethUsdLockIn}
              </Text>
              <Box width="100%">
                <Slider.Root
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(e) => setValue(e.value)}
                  onValueChangeEnd={(e) => setFinalValue(e.value)}
                >
                  <Slider.Control>
                    <Slider.Track bg="rgba(255,255,255,0.05)">
                      <Slider.Range bg="primary.600" />
                    </Slider.Track>
                    <Slider.Thumbs border={"none"} />
                  </Slider.Control>
                </Slider.Root>
              </Box>
              <HStack width={"100%"} justifyContent="space-between">
                <Text color="gray.400" fontWeight={600}>
                  0.1
                </Text>
                <Text color="#FFF" fontSize="2xl" fontWeight="bold">
                  {mappedValue} STETH
                </Text>
                <Text color="gray.400" fontWeight={600}>
                  100
                </Text>
              </HStack>
            </VStack>
          </Grid>

          <Box
            borderRadius={8}
            background="rgba(255,255,255,0.02)"
            px={{ base: 2, md: 6 }}
            py={{ base: 4, md: 6 }}
            overflowX="auto"
            width="100%"
          >
            <Grid
              templateColumns={{
                base: "repeat(4, minmax(120px, 1fr))",
                md: "1fr 1fr 1fr 1fr",
              }}
              borderBottom="1px solid rgba(255,255,255,0.12)"
              mb={2}
              textAlign="left"
              minWidth={{ base: "480px", md: "auto" }}
            >
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                {metricsPageLocale?.lockPeriod}
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                {metricsPageLocale?.multiplier}
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                {metricsPageLocale?.newInitialValue}
              </Text>
              <HStack>
                <Text
                  color="#FFF"
                  fontWeight="bold"
                  fontSize="lg"
                  py={2}
                  pl={4}
                >
                  {metricsPageLocale?.rewardEstimate}
                </Text>
                <Tooltip
                  content={metricsPageLocale?.tooltips?.rewardEstimate}
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
            </Grid>
            {generateTableRows({
              totalVirtualStakedUSD,
              morPrice,
              inputValue: finalMappedValue,
            }).map((row, idx) => (
              <Grid
                key={row.days}
                templateColumns={{
                  base: "repeat(4, minmax(120px, 1fr))",
                  md: "1fr 1fr 1fr 1fr",
                }}
                borderBottom={
                  idx < 4 ? "1px solid rgba(255,255,255,0.08)" : "none"
                }
                alignItems="center"
                textAlign="left"
                minWidth={{ base: "480px", md: "auto" }}
              >
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.days}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.multiplier}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.newInitialValue}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.rewardEstimate}
                </Text>
              </Grid>
            ))}
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
export default Forcast;
