"use client";
import {
  Button as ChakraButton,
  Icon,
  useRecipe,
  HStack,
} from "@chakra-ui/react";
import { Props } from "./props";
import Link from "next/link";
import { buttonRecipe } from "morpheus-asia/containers/ChakraProvider/theme";
import { useState } from "react";
import { isEmpty } from "lodash";
import CustomImage from "../Image";
import { LuArrowRight } from "react-icons/lu";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Button: React.FC<Props> = (props) => {
  const {
    icon,
    href,
    onClick,
    hasArrow,
    children,
    contentProps,
    linkStyleProps,
    iconHoverState,
    visual = "solid",
    target = "_self",
    ...restProps
  } = props;

  // =============== STATE
  const [isHovered, setIsHovered] = useState(false);

  // =============== VARIABLES
  const recipe = useRecipe({ recipe: buttonRecipe });
  const styles = recipe({ visual });
  const pressableButton = !isEmpty(href);

  // =============== RENDER
  const renderButton = () => {
    return (
      <ChakraButton
        css={styles}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...restProps}
      >
        <HStack {...contentProps}>
          {!isEmpty(icon) && icon && (
            <CustomImage data={isHovered ? iconHoverState : icon} />
          )}
          {children}
          {hasArrow && (
            <Icon>
              <LuArrowRight />
            </Icon>
          )}
        </HStack>
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
