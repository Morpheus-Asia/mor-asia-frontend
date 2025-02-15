import { Box, HStack, Text } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import { Props } from "./props";
import CustomImage from "../Image";
import { map } from "lodash";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Footer: React.FC<Props> = (props) => {
  const { data } = props;
  // =============== HOOKS

  // =============== STATE

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES
  const footerLogo = data?.footerLogo?.image;
  const footerHref = data?.footerLogo?.href;

  console.log("daata in here--------->", data);

  // =============== RENDER FUNCTIONS
  const renderFooterIcon = () => {
    return map(data?.socialIcon, (icon) => {
      const href = icon?.icon?.href;
      return (
        <CustomImage
          key={icon?.title}
          href={href}
          data={icon?.icon?.image}
          width={20}
          height={20}
        />
      );
    });
  };

  // =============== VIEWS
  return (
    <Box
      background="radial-gradient(120.3% 120.3% at 50% 170.3%,#138656 0,#138555 14.82%,#128153 26.62%,#127c50 35.81%,#11754b 42.83%,#0f6d46 48.11%,#0e6440 52.08%,#0d5a3a 55.18%,#0b5033 57.83%,#0a462d 60.46%,#083c26 63.5%,#073220 67.39%,#06291a 72.55%,#052115 79.42%,#041b11 88.43%,#03160e 100%)"
      pt={10}
    >
      <ContainerWrapper>
        <Box
          w="full"
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems={"center"}
          textAlign={"center"}
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 5, md: 0 }}
        >
          <Box
            width={{ base: "full", md: "1/3" }}
            display={"flex"}
            justifyContent={{ base: "center", md: "flex-start" }}
            alignItems={"center"}
          >
            <CustomImage
              data={footerLogo}
              width={50}
              height={50}
              href={footerHref}
            />
          </Box>
          {/**Desktop */}
          <Box
            width={"1/3"}
            display={{ base: "none", md: "flex" }}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <Text color={"rgba(255, 255, 255, 0.64)"}>{data?.footerText}</Text>
          </Box>
          <HStack
            gap={5}
            width={"1/3"}
            display={{ base: "none", md: "flex" }}
            justifyContent={"flex-end"}
          >
            {renderFooterIcon()}
          </HStack>
          {/**Mobile */}
          <HStack
            gap={5}
            width={"full"}
            display={{ base: "flex", md: "none" }}
            justifyContent={"center"}
          >
            {renderFooterIcon()}
          </HStack>
          <Box
            width={"full"}
            display={{ base: "flex", md: "none" }}
            textAlign={"center"}
          >
            <Text color={"rgba(255, 255, 255, 0.64)"}>{data?.footerText}</Text>
          </Box>
        </Box>
      </ContainerWrapper>
    </Box>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Footer;
