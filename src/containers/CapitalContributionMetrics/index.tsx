"use client";
import { Box, Grid, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import ETHLogo from "morpheus-asia/Image/ETH.png";
import { getDictionary } from "morpheus-asia/i18n";
import PercentageChip from "morpheus-asia/components/PercentageChip";
import { MdOutlineAutoGraph } from "react-icons/md";

type Props = {
  locale?: string;
};

export const CapitalContributionMetrics: React.FC<Props> = ({ locale }) => {
  // =============== LOCALE
  const metricsPageLocale = getDictionary(locale)?.metricsPage;

  // Placeholder values
  const price = "$3252.23";
  const percent = 5.0;
  const dailyEmission = "3,266.0471 MOR";
  const stakedSeth = "15,230.45 SETH";
  const virtualSeth = "15,230.45 SETH";

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
        {/* Bottom section: 3 metrics */}
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
          gap="18%" 
          width="100%"
          justifyContent="space-between"
        >
          <VStack alignItems="flex-start" gap={0}>
            <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
              {metricsPageLocale?.dailyEmission}
            </Text>
            <Text color="#FFF" fontWeight="bold" fontSize="3xl">
              {dailyEmission}
            </Text>
          </VStack>
          <VStack alignItems="flex-start" gap={0}>
            <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
              {metricsPageLocale?.stakedSeth}
            </Text>
            <Text color="#FFF" fontWeight="bold" fontSize="3xl">
              {stakedSeth}
            </Text>
          </VStack>
          <VStack alignItems="flex-start" gap={0}>
            <Text color="#FFF" fontWeight="semibold" fontSize="sm" opacity={0.8} textTransform="uppercase">
              {metricsPageLocale?.virtualSeth}
            </Text>
            <Text color="#FFF" fontWeight="bold" fontSize="3xl">
              {virtualSeth}
            </Text>
          </VStack>
        </Grid>
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
        <Box
          borderRadius={8}
          background="rgba(255,255,255,0.02)"
          px={{ base: 2, md: 6 }}
          py={{ base: 4, md: 6 }}
          overflowX="auto"
        >
          <Grid
            templateColumns={{ base: '1fr 1fr' }}
            borderBottom="1px solid rgba(255,255,255,0.12)"
            mb={2}
          >
            <Text color="#FFF" fontWeight="bold" fontSize="md" py={2}>
              YEAR
            </Text>
            <Text color="#FFF" fontWeight="bold" fontSize="md" py={2}>
              YIELD PERCENTAGE
            </Text>
          </Grid>
          {[
            { year: '1 Year', yield: '5%' },
            { year: '2 Year', yield: '10%' },
            { year: '3 Year', yield: '15%' },
            { year: '4 Year', yield: '20%' },
            { year: '5 Year', yield: '25%' },
            { year: '6 Year', yield: '30%' },
          ].map((row, idx) => (
            <Grid
              key={row.year}
              templateColumns={{ base: '1fr 1fr' }}
              borderBottom={idx < 5 ? '1px solid rgba(255,255,255,0.08)' : 'none'}
              alignItems="center"
            >
              <Text color="#FFF" fontSize="md" py={2}>
                {row.year}
              </Text>
              <Text color="#FFF" fontSize="md" py={2}>
                {row.yield}
              </Text>
            </Grid>
          ))}
        </Box>
      </Box>
    </VStack>
  );
};

export default CapitalContributionMetrics; 