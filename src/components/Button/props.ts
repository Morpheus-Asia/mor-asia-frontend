import { ButtonProps, TextProps } from "@chakra-ui/react";
import { LinkProps } from "next/link";
import { ReactNode } from "react";
import type { RecipeVariantProps, StackProps } from "@chakra-ui/react";
import { buttonRecipe } from "morpheus-asia/containers/ChakraProvider/theme";

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;

export type Props = ButtonProps &
  ButtonVariantProps & {
    href?: LinkProps["href"];
    target?: string;
    children: ReactNode;
    textProps?: TextProps;
    pressableButton?: boolean;
    linkStyleProps?: Record<string, any>;
    wrappedText?: boolean;
    icon?: any;
    hasArrow?: boolean;
    iconHoverState?: any;
    contentProps?: StackProps;
  };
