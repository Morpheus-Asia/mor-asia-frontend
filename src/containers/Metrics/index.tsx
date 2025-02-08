import {
  Box,
  Heading,
  Skeleton,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import ContainerWrapper from "../ContainerWrapper";
import Script from "next/script";
import Button from "morpheus-asia/components/Button";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Metrics: React.FC<Props> = (props) => {
  const { title, subTitle, metricsButton, locale } = props;
  // =============== HOOKS
  const linkWidth = useBreakpointValue({
    base: "100%",
    md: "auto",
  });

  // =============== VIEWS
  return (
    <ContainerWrapper py={10}>
      <Script
        src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"
        strategy="afterInteractive"
      />
      <VStack gap={5}>
        <Box
          justifyContent="space-between"
          width="100%"
          alignItems={"flex-start"}
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 3, md: 0 }}
        >
          <VStack color="white" alignItems={"flex-start"}>
            <Heading fontSize={"2rem"}>{title}</Heading>
            <Text color="rgba(255, 255, 255, 0.64)">{subTitle}</Text>
          </VStack>
          <Button
            pressableButton
            href={metricsButton?.url}
            width={{ base: "100%", md: "auto" }}
            linkStyleProps={{
              width: linkWidth,
            }}
          >
            {metricsButton?.text}
          </Button>
        </Box>
        <Box width="100%">
          {/** @ts-expect-error web component */}
          <gecko-coin-price-chart-widget
            locale="en"
            dark-mode="true"
            outlined="true"
            coin-id="morpheusai"
            initial-currency={locale === "en" ? "usd" : "cny"}
          >
            <Skeleton height="300px" borderRadius={9} />
            {/** @ts-expect-error web component */}
          </gecko-coin-price-chart-widget>
        </Box>
      </VStack>
    </ContainerWrapper>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Metrics;
