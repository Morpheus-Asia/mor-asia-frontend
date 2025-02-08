"use client";
import { Button as ChakraButton, Text } from "@chakra-ui/react";
import { Props } from "./props";
import Link from "next/link";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Button: React.FC<Props> = (props) => {
  const {
    variant,
    children,
    textProps,
    href,
    target,
    pressableButton = false,
    onClick,
    linkStyleProps,
    ...restProps
  } = props;

  // =============== RENDER
  const renderButton = () => {
    return (
      <ChakraButton
        background="primary.600"
        variant={variant}
        onClick={onClick}
        _hover={{
          background: "#179c65",
          transition: "all 0.3s ease-in-out",
        }}
        {...restProps}
      >
        <Text color="buttonText.500" fontWeight={"bold"} {...textProps}>
          {children}
        </Text>
      </ChakraButton>
    );
  };

  // =============== VIEWS
  if (!pressableButton) return renderButton();

  return (
    <Link
      href={href || ""}
      passHref
      target={target}
      style={{
        cursor: "pointer",
        ...linkStyleProps,
      }}
    >
      {renderButton()}
    </Link>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Button;
