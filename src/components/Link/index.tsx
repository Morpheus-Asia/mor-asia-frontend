"use client";
import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Link: React.FC<Props> = (props) => {
  const { children, href, textProps, target, ...restProps } = props;

  // =============== VIEWS
  return (
    <NextLink href={href} target={target} {...restProps}>
      <Text color="white" {...textProps}>
        {children}
      </Text>
    </NextLink>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Link;
