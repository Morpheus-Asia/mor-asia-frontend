"use client";
import { Box, Grid, HStack, Image, Stack, Text, VStack, Input } from "@chakra-ui/react";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import { getDictionary } from "morpheus-asia/i18n";
import PercentageChip from "morpheus-asia/components/PercentageChip";
import { MdOutlineAutoGraph } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaLandmark } from "react-icons/fa";
import React, { useState, ChangeEvent } from "react";
import ETHLogo from "morpheus-asia/Image/ETH.png";
import ReactApexcharts from "morpheus-asia/components/Charts/apex-charts";
import { ApexOptions } from "apexcharts";

type Props = {
  locale?: string;
};

export const CapitalContributionMetrics: React.FC<Props> = ({ locale }) => {
  // =============== LOCALE
  const metricsPageLocale = getDictionary(locale)?.metricsPage;

  // Placeholder values
  const price = "$3252.23";
  const percent = 5.0;
  const balance = "1,516,056.8173 MOR";
  const dailyAccrual = "3,266.0471 MOR";
  const totalLocked = "15,230.45 stETH";

  const [inputValue, setInputValue] = useState<number>(1000);
  const [timeLength, setTimeLength] = useState<number>(5);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const onHandleTooltipToggle = (tooltipName: string) => {
    setActiveTooltip(activeTooltip === tooltipName ? null : tooltipName);
  };

  const generateTableRows = () => {
    return [
      { days: '7 Days', multiplier: '5x', value: '$5,000' },
      { days: '30 Days', multiplier: '10x', value: '$10,000' },
      { days: '180 Days', multiplier: '15x', value: '$15,000' },
      { days: '365 Days', multiplier: '20x', value: '$20,000' },
      { days: '2190 Days', multiplier: '25x', value: '$25,000' }
    ];
  };

  return (
    <VStack width="100%" alignItems="flex-start" gap={6}>
      {/* Heading outside the box */}
      <Text color="#FFF" fontWeight="bold" fontSize="3xl">
        {metricsPageLocale?.capitalContributionMetrics}
      </Text>
      <Box
        width="100%"
        borderRadius={8}
        background="rgba(255,255,255,0.05)"
        px={{ base: 4, md: 10 }}
        py={{ base: 6, md: 10 }}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        {/* Top section: sETH info, price, percent, chart */}
        <HStack width="100%" alignItems="flex-start" justifyContent="space-between" gap={8}>
          <HStack alignItems="center" gap={5}>
            <Image src={ETHLogo.src} alt="sETH" boxSize="56px" borderRadius="full" />
            <VStack alignItems="flex-start" gap={0}>
              <HStack alignItems="center" gap={2}>
                <Text color="#FFF" fontWeight="bold" fontSize="xl">sETH</Text>
                <Text color="#A2A3A6" fontSize="sm">SETH/USD</Text>
              </HStack>
              <HStack alignItems="center" gap={4}>
                <Text color="#FFF" fontWeight="extrabold" fontSize="3xl">
                  {price}
                </Text>
                <PercentageChip value={percent} />
              </HStack>
            </VStack>
          </HStack>
          {/* Placeholder chart */}
          <Box minW={{ base: "120px", md: "240px" }} h="80px" display="flex" alignItems="center" justifyContent="flex-end">
            <ReactApexcharts
              options={{
                chart: {
                  type: "line",
                  background: "transparent",
                  zoom: { enabled: false },
                  toolbar: { show: false },
                  sparkline: { enabled: true },
                },
                colors: ["#00DC8D"],
                stroke: { curve: "monotoneCubic", width: 2 },
                markers: {
                  size: 0,
                },
                tooltip: {
                  enabled: false,
                },
                grid: {
                  show: false,
                },
                xaxis: {
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                },
                yaxis: {
                  show: false,
                },
              }}
              series={[{ data: [60, 40, 50, 20, 40, 10, 50, 30, 60] }]}
              type="line"
              height={80}
              width="100%"
            />
          </Box>
        </HStack>
        {/* Divider replacement */}
        <Box width="100%" height="1px" background="rgba(255,255,255,0.12)" my={2} />
        {/* Daily Emissions Heading */}
        <VStack alignItems="flex-start" gap={0}>
          <HStack>
            <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
              Daily Emissions
            </Text>
            <Tooltip 
              content="Total MOR tokens emitted to all groups" 
              positioning={{ placement: "top" }}
              showArrow
              open={activeTooltip === 'dailyEmissions'}
              onOpenChange={(e) => onHandleTooltipToggle('dailyEmissions')}
              openDelay={100}
              closeDelay={0}
            >
              <Box cursor="pointer">
                <IoHelpCircleOutline color="#A2A3A6" size={16} />
              </Box>
            </Tooltip>
          </HStack>
          <Text color="#FFF" fontWeight="bold" fontSize="3xl">
            3,266.0471 MOR
          </Text>
        </VStack>
        {/* Capital Pool Section */}
        <Box
          width="100%"
          borderRadius={8}
          background="rgba(255,255,255,0.05)"
          px={{ base: 4, md: 10 }}
          py={{ base: 6, md: 8 }}
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <HStack gap={3}>
            <FaLandmark color="#00DC8D" size={20} />
            <Text color="#FFF" fontWeight="bold" fontSize="2xl">
              Capital Pool
            </Text>
          </HStack>
          {/* Bottom section: 3 metrics */}
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
            gap="5%" 
            width="100%"
            justifyContent="space-between"
          >
            <VStack alignItems="flex-start" gap={0}>
              <HStack>
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  Balance
                </Text>
                <Tooltip 
                  content="Total amount of MOR tokens held in the Capital Pool" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'balance'}
                  onOpenChange={(e) => onHandleTooltipToggle('balance')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                {balance}
              </Text>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <HStack>
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  Daily Accrual
                </Text>
                <Tooltip 
                  content="Amount of MOR tokens added to the pool from daily emissions" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'dailyAccrual'}
                  onOpenChange={(e) => onHandleTooltipToggle('dailyAccrual')}
                  openDelay={100}
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
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  Total Locked
                </Text>
                <Tooltip 
                  content="Total amount of sETH locked in the capital pool" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'totalLocked'}
                  onOpenChange={(e) => onHandleTooltipToggle('totalLocked')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                {totalLocked}
              </Text>
            </VStack>
          </Grid>

          {/* Additional Metrics */}
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
            gap="5%" 
            width="100%"
            justifyContent="space-between"
          >
            <VStack alignItems="flex-start" gap={0}>
              <HStack>
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  APY
                </Text>
                <Tooltip 
                  content="Annual Percentage Yield: Annual return on sETH in Capital Pool" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'apy'}
                  onOpenChange={(e) => onHandleTooltipToggle('apy')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                2.70%
              </Text>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <HStack>
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  Annual Yield
                </Text>
                <Tooltip 
                  content="Return generated from Total Locked sETH based on APY" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'annualYield'}
                  onOpenChange={(e) => onHandleTooltipToggle('annualYield')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                $1,687,358.28
              </Text>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <HStack>
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  Unclaimed Yield
                </Text>
                <Tooltip 
                  content="Accrued stETH yield unclaimed by capital providers" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'unclaimedYield'}
                  onOpenChange={(e) => onHandleTooltipToggle('unclaimedYield')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                259.45 stETH
              </Text>
            </VStack>
          </Grid>
        </Box>
      </Box>
      {/* New APY Forecast Table as a separate section */}
      <Box
        width="100%"
        borderRadius={8}
        background="rgba(255,255,255,0.05)"
        px={{ base: 4, md: 10 }}
        py={{ base: 6, md: 10 }}
      >
        <HStack gap={2} mb={4}>
          <MdOutlineAutoGraph color="#00DC8D" size={24} />
          <Text color="#FFF" fontWeight="bold" fontSize="xl">
            Staking MOR Rewards Forecast
          </Text>
        </HStack>

        <VStack gap={6} alignItems="flex-start" width="100%">
          {/* Total Virtual Staked stETH Section */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} width="100%">
            <VStack alignItems="flex-start" gap={0}>
              <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                Total Virtual Staked stETH as of Today
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                15,230.45 stETH
              </Text>
            </VStack>

            <VStack alignItems="flex-start" gap={0}>
              <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                Percentage of Total Virtual Staked stETH
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                2.5%
              </Text>
            </VStack>
          </Grid>

          {/* Inputs Section */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} width="100%">
            <VStack alignItems="flex-start" gap={2}>
              <Text color="#FFF" fontSize="xl" fontWeight="bold">Staked stETH (USD)</Text>
              <Input
                type="number"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(Number(e.target.value))}
                min={0}
                color="#FFF"
                borderRadius={8}
                width="100%"
                textAlign="left"
                fontSize="xl"
                fontWeight="bold"
                border="none"
                _focus={{ border: "none", boxShadow: "none" }}
              />
            </VStack>

            <VStack alignItems="flex-start" gap={2}>
              <Text color="#FFF" fontSize="xl" fontWeight="bold">Lock-in Length (Days from today)</Text>
              <Input
                type="number"
                value={timeLength}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if (value >= 2 && value <= 10) {
                    setTimeLength(value);
                  }
                }}
                min={2}
                max={10}
                color="#FFF"
                borderRadius={8}
                width="100%"
                textAlign="left"
                fontSize="xl"
                fontWeight="bold"
                border="none"
                _focus={{ border: "none", boxShadow: "none" }}
              />
            </VStack>
          </Grid>

          {/* Table Section */}
          <Box
            borderRadius={8}
            background="rgba(255,255,255,0.02)"
            px={{ base: 2, md: 6 }}
            py={{ base: 4, md: 6 }}
            overflowX="auto"
            width="100%"
          >
            <Grid
              templateColumns={{ base: '1fr 1fr 1fr' }}
              borderBottom="1px solid rgba(255,255,255,0.12)"
              mb={2}
              textAlign="left"
            >
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                LOCK PERIOD
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                MULTIPLIER
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                VALUE (USD)
              </Text>
            </Grid>
            {generateTableRows().map((row, idx) => (
              <Grid
                key={row.days}
                templateColumns={{ base: '1fr 1fr 1fr' }}
                borderBottom={idx < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none'}
                alignItems="center"
                textAlign="left"
              >
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.days}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.multiplier}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.value}
                </Text>
              </Grid>
            ))}
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default CapitalContributionMetrics; 