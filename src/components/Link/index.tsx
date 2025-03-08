"use client";
import { Box, HStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Link: React.FC<Props> = (props) => {
  const {
    children,
    href,
    textProps,
    target,
    comingSoonFlag = false,
    ...restProps
  } = props;

  // =============== RENDER
  const renderLink = () => {
    return (
      <NextLink href={href} target={target} {...restProps}>
        <Text color="white" {...textProps}>
          {children}
        </Text>
      </NextLink>
    );
  };

  // =============== VIEWS
  if (comingSoonFlag) {
    return (
      <HStack alignItems={"center"}>
        <Text color="gray.300" cursor={"not-allowed"}>
          {children}
        </Text>
        <Box
          as="span"
          bg="rgba(32, 220, 142, 0.1)"
          color="#9AE6B4"
          px="10px"
          py="4px"
          fontSize="10px"
          borderRadius="12px"
          fontWeight="medium"
          alignItems="center"
          ml="2px"
          _hover={{
            boxShadow: "0 0 6px rgba(32, 220, 142, 0.6)",
            color: "#20DC8E",
          }}
        >
          Coming Soon
        </Box>
      </HStack>
    );
  }
  return renderLink();
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Link;
