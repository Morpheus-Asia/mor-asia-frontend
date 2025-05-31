import {
  Box,
  Grid,
  GridItem,
  HStack,
  Slider,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { MdOutlineAutoGraph } from "react-icons/md";
import { generateTableRows, nonLinearMap } from "./helper";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import { useState } from "react";
import { IoHelpCircleOutline } from "react-icons/io5";
import { ForcastProps } from "./props";
import MetricsBox from "morpheus-asia/components/MetricsBox";
import React from "react";

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

  // =============== STATE
  const [value, setValue] = useState([0]);
  const [finalValue, setFinalValue] = useState([0]);

  // =============== VARIABLES
  const mappedValue = nonLinearMap(value[0]);
  const finalMappedValue = nonLinearMap(finalValue[0]) * ethPrice;

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
          <Text color="#FFF" fontWeight="bold" fontSize={"1.25rem"}>
            {metricsPageLocale?.stakingMorRewardsForecast}
          </Text>
        </HStack>

        <VStack gap={6} alignItems="flex-start" width="100%">
          <Box width="100%" mb={2}>
            <Text fontSize="sm" color="gray.400" fontStyle="italic">
              <Tooltip
                content={metricsPageLocale?.disclaimerTooltip}
                positioning={{ placement: "top" }}
                showArrow
                openDelay={0}
                closeDelay={0}
              >
                <Box
                  as="span"
                  cursor="pointer"
                  textDecoration="underline dotted"
                >
                  {metricsPageLocale?.disclaimerMain}
                </Box>
              </Tooltip>{" "}
              {metricsPageLocale?.disclaimerStaking}{" "}
              {(() => {
                const moreInfo = metricsPageLocale?.disclaimerMoreInfo || "";
                const parts = moreInfo.split("{here}");
                return (
                  <>
                    {parts[0]}
                    <Link
                      href="https://morpheusai.gitbook.io/morpheus"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="#FFF"
                      fontWeight="bold"
                      textDecoration="underline"
                    >
                      here
                    </Link>
                    {parts[1]}
                  </>
                );
              })()}
            </Text>
          </Box>
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
                  fontSize={{ md: ".8rem", lg: ".875rem" }}
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
              <Text
                color="#FFF"
                fontWeight="bold"
                fontSize={{
                  base: "1.5rem",
                  sm: "1.3rem",
                  md: "1.4rem",
                  lg: "1.5rem",
                  xl: "1.875rem",
                }}
              >
                {totalVirtualStaked}
              </Text>
            </VStack>

            <VStack alignItems="flex-start" gap={0}>
              <Text
                color="#FFF"
                fontWeight="semibold"
                fontSize={{ md: ".8rem", lg: ".875rem" }}
                opacity={0.8}
                textTransform="uppercase"
              >
                {metricsPageLocale?.valueInUsd}
              </Text>
              {totalVirtualStakedUSD && (
                <Text
                  color="#FFF"
                  fontWeight="bold"
                  fontSize={{
                    base: "1.5rem",
                    sm: "1.3rem",
                    md: "1.4rem",
                    lg: "1.5rem",
                    xl: "1.875rem",
                  }}
                >
                  {totalVirtualStakedUSD}
                </Text>
              )}
            </VStack>

            <VStack alignItems="flex-start" width="100%">
              <Text
                color="#FFF"
                fontWeight="semibold"
                fontSize={{ md: ".8rem", lg: ".875rem" }}
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
                  {mappedValue} stETH
                </Text>
                <Text color="gray.400" fontWeight={600}>
                  100
                </Text>
              </HStack>
              <Text
                color="#FFF"
                fontSize="lg"
                fontWeight="semibold"
                opacity={0.8}
                textAlign="center"
                width="100%"
              >
                ≈ $
                {(mappedValue * ethPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </VStack>
          </Grid>

          <Box
            borderRadius={8}
            background="rgba(255,255,255,0.02)"
            px={{ base: 2, md: 6 }}
            py={2}
            overflowX="auto"
            width="100%"
          >
            <Grid
              templateColumns={{
                base: "repeat(7, minmax(120px, 1fr))",
                md: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              }}
              borderBottom="1px solid rgba(255,255,255,0.12)"
              mb={0}
              textAlign="left"
              minWidth="1200px"
            >
              <GridItem colSpan={1}></GridItem>
              <GridItem colSpan={2}>
                <Text
                  color="#FFF"
                  fontWeight="bold"
                  fontSize="xl"
                  textAlign="center"
                  opacity={0.8}
                  py={2}
                >
                  {metricsPageLocale?.stakingWithoutLockup}
                </Text>
              </GridItem>
              <GridItem colSpan={4}>
                <Text
                  color="#FFF"
                  fontWeight="bold"
                  fontSize="xl"
                  textAlign="center"
                  opacity={0.8}
                  py={2}
                >
                  {metricsPageLocale?.stakingWithLockup}
                </Text>
              </GridItem>

              <GridItem>
                <Tooltip
                  content={metricsPageLocale?.tooltips?.timePeriod}
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.timePeriod}
                  </Text>
                </Tooltip>
              </GridItem>
              <GridItem borderLeft="1px solid rgba(255,255,255,0.12)">
                <Tooltip
                  content={metricsPageLocale?.tooltips?.rewardEstimateNoLock}
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.rewardEstimateNoLock}
                  </Text>
                </Tooltip>
              </GridItem>
              <GridItem borderRight="1px solid rgba(255,255,255,0.12)">
                <Tooltip
                  content={metricsPageLocale?.tooltips?.percentageYield}
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.percentageYield}
                  </Text>
                </Tooltip>
              </GridItem>
              <GridItem>
                <Tooltip
                  content={metricsPageLocale?.tooltips?.multiplier}
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.multiplier}
                  </Text>
                </Tooltip>
              </GridItem>
              <GridItem>
                <Tooltip
                  content={metricsPageLocale?.tooltips?.newInitialValue}
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.newInitialValue}
                  </Text>
                </Tooltip>
              </GridItem>
              <GridItem>
                <Tooltip
                  content={metricsPageLocale?.tooltips?.rewardEstimate}
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.rewardEstimate}
                  </Text>
                </Tooltip>
              </GridItem>
              <GridItem borderRight="1px solid rgba(255,255,255,0.12)">
                <Tooltip
                  content={
                    metricsPageLocale?.tooltips?.percentageYieldWithMultiplier
                  }
                  positioning={{ placement: "top" }}
                  showArrow
                  openDelay={0}
                  closeDelay={0}
                >
                  <Text
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="lg"
                    py={2}
                    pl={4}
                  >
                    {metricsPageLocale?.percentageYieldWithMultiplier}
                  </Text>
                </Tooltip>
              </GridItem>
            </Grid>
            {generateTableRows({
              totalVirtualStakedUSD,
              morPrice,
              inputValue: finalMappedValue,
            }).map((row, idx) => (
              <Grid
                key={row.days}
                templateColumns={{
                  base: "repeat(7, minmax(120px, 1fr))",
                  md: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                }}
                borderBottom={
                  idx < 6 ? "1px solid rgba(255,255,255,0.08)" : "none"
                }
                alignItems="center"
                textAlign="left"
                minWidth="1200px"
              >
                <GridItem>
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.days}
                  </Text>
                </GridItem>
                <GridItem borderLeft="1px solid rgba(255,255,255,0.12)">
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.rewardEstimateNoLock}
                  </Text>
                </GridItem>
                <GridItem borderRight="1px solid rgba(255,255,255,0.12)">
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.percentageYield}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.multiplier}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.newInitialValue}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.rewardEstimate}
                  </Text>
                </GridItem>
                <GridItem borderRight="1px solid rgba(255,255,255,0.12)">
                  <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                    {row.percentageYieldWithMultiplier}
                  </Text>
                </GridItem>
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
