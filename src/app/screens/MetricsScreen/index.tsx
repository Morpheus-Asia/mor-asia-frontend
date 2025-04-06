import { Box, Text, VStack } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import { MetricsCirculatingSupply } from "morpheus-asia/containers/MetricsCirculatingSupply";
import MetricsTopMetrics from "morpheus-asia/containers/MetricsContainer/MorpheusTopMetrics";
import { MetricsPriceHistory } from "morpheus-asia/containers/MetricsPriceHistory";

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
          <VStack justifyContent={"center"} alignItems={"center"}>
            {/** TODO: coming from strapi */}
            <Text color="#FFF" fontWeight={"bold"} fontSize={"4xl"}>
              {metricsPage.heading}
            </Text>
            <Text color="rgba(255, 255, 255, 0.75)" fontSize={"lg"}>
              {metricsPage.subHeading}
            </Text>
          </VStack>
          <MetricsTopMetrics locale={locale} />
          <Box width={"100%"}>
            <MetricsPriceHistory locale={locale} />
          </Box>
          <Box width="100%">
            <MetricsCirculatingSupply locale={locale} />
          </Box>
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
