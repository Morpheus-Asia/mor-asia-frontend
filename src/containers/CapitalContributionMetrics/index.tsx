"use client";
import { Box, Grid, HStack, Image, Stack, Text, VStack, Input } from "@chakra-ui/react";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import { getDictionary } from "morpheus-asia/i18n";
import PercentageChip from "morpheus-asia/components/PercentageChip";
import { MdOutlineAutoGraph } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaLandmark } from "react-icons/fa";
import React, { useState, ChangeEvent, useMemo, useEffect } from "react";
import ETHLogo from "morpheus-asia/Image/ETH.png";
import QuickView24HrLineChart from "morpheus-asia/components/Charts/QuickViewLineChart";
import { ApexOptions } from "apexcharts";
import ReactApexcharts from "morpheus-asia/components/Charts/apex-charts";

type Props = {
  locale?: string;
};

export const CapitalContributionMetrics: React.FC<Props> = ({ locale }) => {
  // =============== LOCALE
  const metricsPageLocale = getDictionary(locale)?.metricsPage;

  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [totalVirtualStaked, setTotalVirtualStaked] = useState<string>("");
  const [totalVirtualStakedUSD, setTotalVirtualStakedUSD] = useState<string>("");
  const [metrics, setMetrics] = useState({} as any);
  const [ethPrice, setEthPrice] = useState<string>("");
  const [morPrice, setMorPrice] = useState<number>(0);

  // =============== EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total virtual staked
        const virtualStakedResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cap_virtual_deposited`
        );
        const virtualStakedData = await virtualStakedResponse.json();
        if (virtualStakedData && virtualStakedData.data && virtualStakedData.data.totalVirtualDeposited) {
          const formattedValue = (Number(virtualStakedData.data.totalVirtualDeposited) / 1e18).toFixed(4);
          setTotalVirtualStaked(`${formattedValue} ETH`);
          
          // Calculate USD value if ETH price is available
          const ethPriceResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/eth/price`
          );
          const ethPriceData = await ethPriceResponse.json();
          if (ethPriceData && ethPriceData.data && ethPriceData.data.priceUsd) {
            const ethPriceUsd = Number(ethPriceData.data.priceUsd);
            const usdValue = (Number(formattedValue) * ethPriceUsd).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            });
            setTotalVirtualStakedUSD(usdValue);
          }
        } else {
          console.error('Unexpected API response structure:', virtualStakedData);
          setTotalVirtualStaked('Error: Invalid response format');
        }

        // Fetch ETH price
        const ethPriceResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/eth/price`
        );
        const ethPriceData = await ethPriceResponse.json();
        if (ethPriceData && ethPriceData.data && ethPriceData.data.priceUsd) {
          setEthPrice(`$${Number(ethPriceData.data.priceUsd).toFixed(2)}`);
        } else {
          console.error('Unexpected ETH price API response structure:', ethPriceData);
          setEthPrice('Error: Invalid price format');
        }

        // Fetch MOR price
        const currentTime = Date.now();
        const morMetricsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/morpheus-api/data?currentTime=${currentTime}`
        );
        const morMetricsData = await morMetricsResponse.json();
        if (morMetricsData?.data?.asset?.priceUsd) {
          setMorPrice(Number(morMetricsData.data.asset.priceUsd));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalVirtualStaked('Error: Failed to fetch data');
        setEthPrice('Error: Failed to fetch price');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // =============== VARIABLES
  const metricsAsset = metrics?.asset;
  const metricsHistory = metrics?.history;

  const formattedData = {
    series: metricsHistory?.map((item: any) => [
      item.time, // X-axis: Timestamp
      parseFloat(item.priceUsd).toFixed(2), // Y-axis: Rounded price
    ]),
  };

  // Calculate daily emissions
  const calculateDailyEmissions = useMemo(() => {
    const startDate = new Date('2024-02-08');
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const initialEmissions = 14400;
    const dailyDecline = 2.468994701;
    const currentEmissions = initialEmissions - (daysSinceStart * dailyDecline);
    return currentEmissions.toFixed(4);
  }, []);

  // Calculate daily accrual (24% of daily emissions)
  const dailyAccrualValue = useMemo(() => {
    return (Number(calculateDailyEmissions) * 0.24).toFixed(4);
  }, [calculateDailyEmissions]);

  // Placeholder values
  const price = ethPrice || "$3252.23";
  const percent = 5.0;
  const balance = "1,516,056.8173 MOR";
  const dailyAccrual = `${dailyAccrualValue} MOR`;
  const totalLocked = "15,230.45 ETH";

  const [inputValue, setInputValue] = useState<number>(1000);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const onHandleTooltipToggle = (tooltipName: string) => {
    setActiveTooltip(activeTooltip === tooltipName ? null : tooltipName);
  };

  const generateTableRows = () => {
    // Calculate total emissions up to a specific day
    const calculateTotalEmissions = (daysFromStart: number) => {
      let total = 0;
      for (let i = 0; i < daysFromStart; i++) {
        const dailyEmission = 14400 - (i * 2.468994701);
        if (dailyEmission > 0) {
          total += dailyEmission;
        }
      }
      return total;
    };

    // Calculate multipliers based on dilution rates
    const calculateMultiplier = (days: number) => {
      const today = new Date();
      const startDate = new Date('2024-02-08');
      const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate total emissions at current date
      const currentTotalEmissions = calculateTotalEmissions(daysSinceStart);
      
      // Calculate total emissions at future date
      const futureTotalEmissions = calculateTotalEmissions(daysSinceStart + days);
      
      // Calculate dilution rate (as a percentage)
      const dilutionRate = ((futureTotalEmissions - currentTotalEmissions) / currentTotalEmissions) * 100;
      
      // Multiplier is the dilution rate percentage divided by 100, minimum 1.0x
      const multiplier = Math.max(1.0, dilutionRate / 100);
      return multiplier.toFixed(1) + 'x';
    };

    // Convert daily accrual from "X MOR" to number
    const dailyAccrualNumber = parseFloat(dailyAccrualValue);
    
    // Convert totalVirtualStakedUSD from currency string to number
    const totalStakedUSD = parseFloat(totalVirtualStakedUSD.replace(/[^0-9.-]+/g, ''));

    const calculateRewardEstimate = (days: number, newInitialValue: number) => {
      // Calculate portion of daily accrual
      const portion = newInitialValue / totalStakedUSD;
      
      // Calculate total accrual for the period in MOR
      let totalAccrualMOR = 0;
      const startDate = new Date('2024-02-08');
      const today = new Date();
      const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate accrual for each day in the lock period
      for (let i = 0; i < days; i++) {
        // Calculate daily emissions for this specific day
        const dailyEmission = 14400 - ((daysSinceStart + i) * 2.468994701);
        if (dailyEmission > 0) {
          // Calculate daily accrual (24% of daily emissions)
          const dailyAccrual = dailyEmission * 0.24;
          // Add this day's portion of accrual to total
          totalAccrualMOR += dailyAccrual * portion;
        }
      }
      
      // Convert MOR accrual to USD using current MOR price
      const totalAccrualUSD = totalAccrualMOR * morPrice;
      
      // Add to initial value
      return newInitialValue + totalAccrualUSD;
    };

    return [
      { 
        days: '7 Days', 
        multiplier: calculateMultiplier(7), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(7).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(7, inputValue * Number(calculateMultiplier(7).replace('x', ''))).toLocaleString()}`
      },
      { 
        days: '365 Days (1Y)', 
        multiplier: calculateMultiplier(365), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(365).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(365, inputValue * Number(calculateMultiplier(365).replace('x', ''))).toLocaleString()}`
      },
      { 
        days: '730 Days (2Y)', 
        multiplier: calculateMultiplier(730), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(730).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(730, inputValue * Number(calculateMultiplier(730).replace('x', ''))).toLocaleString()}`
      },
      { 
        days: '1095 Days (3Y)', 
        multiplier: calculateMultiplier(1095), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(1095).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(1095, inputValue * Number(calculateMultiplier(1095).replace('x', ''))).toLocaleString()}`
      },
      { 
        days: '1460 Days (4Y)', 
        multiplier: calculateMultiplier(1460), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(1460).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(1460, inputValue * Number(calculateMultiplier(1460).replace('x', ''))).toLocaleString()}`
      },
      { 
        days: '1825 Days (5Y)', 
        multiplier: calculateMultiplier(1825), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(1825).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(1825, inputValue * Number(calculateMultiplier(1825).replace('x', ''))).toLocaleString()}`
      },
      { 
        days: '2190 Days (6Y)', 
        multiplier: calculateMultiplier(2190), 
        newInitialValue: `$${(inputValue * Number(calculateMultiplier(2190).replace('x', ''))).toLocaleString()}`,
        rewardEstimate: `$${calculateRewardEstimate(2190, inputValue * Number(calculateMultiplier(2190).replace('x', ''))).toLocaleString()}`
      }
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
        {/* Top section: ETH info, price, percent, chart */}
        <HStack width="100%" alignItems="flex-start" justifyContent="space-between" gap={8}>
          <HStack alignItems="center" gap={5}>
            <Image src={ETHLogo.src} alt="ETH" boxSize="56px" borderRadius="full" />
            <VStack alignItems="flex-start" gap={0}>
              <HStack alignItems="center" gap={2}>
                <Text color="#FFF" fontWeight="bold" fontSize="xl">ETH</Text>
                <Text color="#A2A3A6" fontSize="sm">ETH/USD</Text>
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
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          <VStack alignItems="flex-start" gap={0}>
            <HStack>
              <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                Initial Daily Emissions
              </Text>
              <Tooltip 
                content="Total MOR tokens emitted to all groups initially" 
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
              14,400 MOR
            </Text>
          </VStack>

          <VStack alignItems="flex-start" gap={0}>
            <HStack>
              <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                Daily Emissions Today
              </Text>
              <Tooltip 
                content="Current daily MOR token emissions" 
                positioning={{ placement: "top" }}
                showArrow
                open={activeTooltip === 'dailyEmissionsToday'}
                onOpenChange={(e) => onHandleTooltipToggle('dailyEmissionsToday')}
                openDelay={100}
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
              Capital Pool (ID: 0)
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
                  content="Accrued staked ETH yield unclaimed by capital providers" 
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
                259.45 ETH
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
          {/* Total Virtual Staked ETH Section with Input */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={8} width="100%">
            {/* ETH Value Column */}
            <VStack alignItems="flex-start" gap={0}>
              <HStack>
                <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                  Total Virtual Staked ETH
                </Text>
                <Tooltip 
                  content="Total Staked ETH in Capital Pool with multiplier accounted for as of today" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'totalVirtualStaked'}
                  onOpenChange={(e) => onHandleTooltipToggle('totalVirtualStaked')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                {loading ? "Loading..." : totalVirtualStaked}
              </Text>
            </VStack>

            {/* USD Value Column */}
            <VStack alignItems="flex-start" gap={0}>
              <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                Value in USD
              </Text>
              {!loading && totalVirtualStakedUSD && (
                <Text color="#FFF" fontWeight="bold" fontSize="3xl">
                  {totalVirtualStakedUSD}
                </Text>
              )}
            </VStack>

            {/* Input Section */}
            <VStack alignItems="flex-start" gap={0}>
              <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
                Staked ETH (USD) Lock-In
              </Text>
              <Input
                type="text"
                value={`$${inputValue}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value.replace('$', '');
                  if (!isNaN(Number(value))) {
                    setInputValue(Number(value));
                  }
                }}
                min={0}
                color="#FFF"
                borderRadius={8}
                width="100%"
                textAlign="left"
                fontSize="xl"
                fontWeight="bold"
                border="none"
                bg="rgba(255,255,255,0.05)"
                py={2}
                px={4}
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
              templateColumns={{ base: '1fr 1fr 1fr 1fr' }}
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
                NEW INITIAL VALUE
              </Text>
              <HStack>
                <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                  REWARD ESTIMATE
                </Text>
                <Tooltip 
                  content="This can change drastically depending on how much more ETH other people stake" 
                  positioning={{ placement: "top" }}
                  showArrow
                  open={activeTooltip === 'rewardEstimate'}
                  onOpenChange={(e) => onHandleTooltipToggle('rewardEstimate')}
                  openDelay={100}
                  closeDelay={0}
                >
                  <Box cursor="pointer">
                    <IoHelpCircleOutline color="#A2A3A6" size={16} />
                  </Box>
                </Tooltip>
              </HStack>
            </Grid>
            {generateTableRows().map((row, idx) => (
              <Grid
                key={row.days}
                templateColumns={{ base: '1fr 1fr 1fr 1fr' }}
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
                  {row.newInitialValue}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.rewardEstimate}
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