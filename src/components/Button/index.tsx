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
    wrappedText = true,
    ...restProps
  } = props;

  // =============== RENDER
  const renderChildren = (defaultProps: any) => {
    return wrappedText ? (
      <Text {...defaultProps} {...textProps}>
        {children}
      </Text>
    ) : (
      children
    );
  };
  const renderButton = () => {
    if (variant === "outline") {
      return (
        <ChakraButton
          {...restProps}
          variant={variant}
          onClick={onClick}
          _hover={{
            background: "#179c65",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 8px 24px rgba(72, 187, 120, 0.2)",
            border: "1px solid #9AE6B4",
            ...restProps?._hover,
          }}
          borderColor="primary.600"
          borderRadius={8}
        >
          {renderChildren({
            color: "white",
            fontWeight: "bold",
          })}
        </ChakraButton>
      );
    }
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
        {renderChildren({
          color: "buttonText.500",
          fontWeight: "bold",
        })}
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
