import { Box, Text, VStack } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import { MetricsCirculatingSupply } from "morpheus-asia/containers/MetricsCirculatingSupply";
import MetricsTopMetrics from "morpheus-asia/containers/MetricsContainer/MorpheusTopMetrics";
import { MetricsPriceHistory } from "morpheus-asia/containers/MetricsPriceHistory";
import CapitalContributionMetrics from "morpheus-asia/containers/CapitalContributionMetrics";
import { MORMetricsProvider } from "./MORMetricsProvider/context";

export type MetricsPageProps = {
  locale?: string;
  metricsPage: {
    heading: string;
    subHeading: string;
  };
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const MetricsPage: React.FC<MetricsPageProps> = (props) => {
  const { locale, metricsPage } = props;

  // =============== VIEWS
  return (
    <>
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"}>
        <VStack gap={5} width="100%">
          {/* In Development Notice */}
          <Box
            width="100%"
            maxWidth="600px"
            bg="rgba(255, 165, 0, 0.1)"
            border="1px solid rgba(255, 165, 0, 0.3)"
            borderRadius="8px"
            px={4}
            py={3}
            mb={2}
          >
            <Text
              color="#FFA500"
              fontSize="sm"
              fontWeight="semibold"
              textAlign="center"
            >
              🚧 This page is currently in development. Data and features may be incomplete or subject to change.
            </Text>
          </Box>
          
          <VStack justifyContent={"center"} alignItems={"center"}>
            <Text color="#FFF" fontWeight={"bold"} fontSize={"4xl"}>
              {metricsPage.heading}
            </Text>
            <Text color="rgba(255, 255, 255, 0.75)" fontSize={"lg"}>
              {metricsPage.subHeading}
            </Text>
          </VStack>
          
          <MORMetricsProvider>
            <MetricsTopMetrics locale={locale} />
            <Box width={"100%"}>
              <MetricsPriceHistory locale={locale} />
            </Box>
            <Box width="100%">
              <MetricsCirculatingSupply locale={locale} />
            </Box>
            <Box width="100%">
              <CapitalContributionMetrics locale={locale} />
            </Box>
          </MORMetricsProvider>
        </VStack>
      </ContainerWrapper>
      {/* <Divider size="sm" />
      <ContainerWrapper>
        <VStack alignItems={"flex-start"}>
          <Text color="#FFF" fontWeight={"bold"} fontSize={"3xl"}>
            Capital Metrics
          </Text>
        </VStack>
      </ContainerWrapper> */}
    </>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default MetricsPage;
