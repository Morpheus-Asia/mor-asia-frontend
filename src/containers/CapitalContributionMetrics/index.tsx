"use client";
import { Box, Grid, HStack, Image, Stack, Text, VStack, Input } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { getDictionary } from "morpheus-asia/i18n";
import PercentageChip from "morpheus-asia/components/PercentageChip";
import { MdOutlineAutoGraph } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaLandmark } from "react-icons/fa";
import React from "react";
import ETHLogo from "morpheus-asia/Image/ETH.png";

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

  const [inputValue, setInputValue] = React.useState<number>(1000);
  const [timeLength, setTimeLength] = React.useState<number>(5);
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  const handleTooltipToggle = (tooltipName: string) => {
    setActiveTooltip(activeTooltip === tooltipName ? null : tooltipName);
  };

  const calculateYield = (year: number, baseValue: number) => {
    // Using compound interest formula: A = P(1 + r)^t
    // where P = principal, r = rate (5% = 0.05), t = time in years
    const rate = 0.05; // 5% APY
    return (baseValue * Math.pow(1 + rate, year)).toFixed(2);
  };

  const calculateCapitalInsight = (initialValue: number, finalValue: number) => {
    return ((finalValue - initialValue) / initialValue * 100).toFixed(2);
  };

  const generateTableRows = () => {
    return Array.from({ length: timeLength }, (_, i) => ({
      year: `${i + 1} Year`,
      yield: `${(i + 1) * 5}%`,
      value: calculateYield(i + 1, inputValue)
    }));
  };

  const finalValue = calculateYield(timeLength, inputValue);
  const capitalInsight = calculateCapitalInsight(inputValue, parseFloat(finalValue));

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
            {/* Simple SVG line as placeholder */}
            <svg width="100%" height="80" viewBox="0 0 240 80">
              <polyline
                fill="none"
                stroke="#00DC8D"
                strokeWidth="3"
                points="0,60 30,40 60,50 90,20 120,40 150,10 180,50 210,30 240,60"
              />
            </svg>
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
              label="Total MOR tokens emitted to all groups" 
              placement="top"
              hasArrow
              bg="gray.700"
              color="white"
              p={3}
              borderRadius="md"
              isOpen={activeTooltip === 'dailyEmissions'}
              onOpen={() => handleTooltipToggle('dailyEmissions')}
              onClose={() => handleTooltipToggle('dailyEmissions')}
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
          py={{ base: 6, md: 10 }}
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <HStack gap={3}>
            <FaLandmark color="#00DC8D" size={26} />
            <Text color="#FFF" fontWeight="bold" fontSize="3xl">
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
                  label="Total amount of MOR tokens held in the Capital Pool" 
                  placement="top"
                  hasArrow
                  bg="gray.700"
                  color="white"
                  p={3}
                  borderRadius="md"
                  isOpen={activeTooltip === 'balance'}
                  onOpen={() => handleTooltipToggle('balance')}
                  onClose={() => handleTooltipToggle('balance')}
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
                  label="Amount of MOR tokens added to the pool from daily emissions" 
                  placement="top"
                  hasArrow
                  bg="gray.700"
                  color="white"
                  p={3}
                  borderRadius="md"
                  isOpen={activeTooltip === 'dailyAccrual'}
                  onOpen={() => handleTooltipToggle('dailyAccrual')}
                  onClose={() => handleTooltipToggle('dailyAccrual')}
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
                  label="Total amount of sETH locked in the capital pool" 
                  placement="top"
                  hasArrow
                  bg="gray.700"
                  color="white"
                  p={3}
                  borderRadius="md"
                  isOpen={activeTooltip === 'totalLocked'}
                  onOpen={() => handleTooltipToggle('totalLocked')}
                  onClose={() => handleTooltipToggle('totalLocked')}
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
                  label="Annual Percentage Yield: Annual return on sETH in Capital Pool" 
                  placement="top"
                  hasArrow
                  bg="gray.700"
                  color="white"
                  p={3}
                  borderRadius="md"
                  isOpen={activeTooltip === 'apy'}
                  onOpen={() => handleTooltipToggle('apy')}
                  onClose={() => handleTooltipToggle('apy')}
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
                  label="Return generated from Total Locked sETH based on APY" 
                  placement="top"
                  hasArrow
                  bg="gray.700"
                  color="white"
                  p={3}
                  borderRadius="md"
                  isOpen={activeTooltip === 'annualYield'}
                  onOpen={() => handleTooltipToggle('annualYield')}
                  onClose={() => handleTooltipToggle('annualYield')}
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
                  label="Accrued stETH yield unclaimed by capital providers" 
                  placement="top"
                  hasArrow
                  bg="gray.700"
                  color="white"
                  p={3}
                  borderRadius="md"
                  isOpen={activeTooltip === 'unclaimedYield'}
                  onOpen={() => handleTooltipToggle('unclaimedYield')}
                  onClose={() => handleTooltipToggle('unclaimedYield')}
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
            APY Forecast In USD
          </Text>
        </HStack>

        <VStack gap={6} alignItems="flex-start" width="100%">
          {/* Inputs Section */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} width="100%">
            <VStack alignItems="flex-start" gap={2}>
              <Text color="#FFF" fontSize="xl" fontWeight="bold">Initial Value (USD)</Text>
              <Input
                type="number"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(Number(e.target.value))}
                min={0}
                bg="rgba(255,255,255,0.02)"
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
              <Text color="#FFF" fontSize="xl" fontWeight="bold">Lockup Time (Years)</Text>
              <Input
                type="number"
                value={timeLength}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if (value >= 2 && value <= 10) {
                    setTimeLength(value);
                  }
                }}
                min={2}
                max={10}
                bg="rgba(255,255,255,0.02)"
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
                YEAR
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                YIELD %
              </Text>
              <Text color="#FFF" fontWeight="bold" fontSize="lg" py={2} pl={4}>
                VALUE (USD)
              </Text>
            </Grid>
            {generateTableRows().map((row, idx) => (
              <Grid
                key={row.year}
                templateColumns={{ base: '1fr 1fr 1fr' }}
                borderBottom={idx < timeLength - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'}
                alignItems="center"
                textAlign="left"
              >
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {row.year}
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  {(idx + 1) * 5}%
                </Text>
                <Text color="#FFF" fontSize="lg" py={2} pl={4}>
                  ${row.value}
                </Text>
              </Grid>
            ))}
          </Box>

          {/* Capital Insight Section */}
          <Box
            borderRadius={8}
            background="rgba(255,255,255,0.02)"
            p={4}
            width="100%"
          >
            <Text color="#FFF" fontSize="sm" fontWeight="semibold" textTransform="uppercase" mb={2} opacity={0.8}>
              Capital Insight
            </Text>
            <Text color="#FFF" fontSize="2xl" fontWeight="bold">
              {capitalInsight}% Total Return
            </Text>
            <Text color="#A2A3A6" fontSize="sm" mt={1}>
              From ${inputValue} to ${finalValue} over {timeLength} years
            </Text>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default CapitalContributionMetrics; 