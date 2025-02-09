import { ButtonProps, TextProps } from "@chakra-ui/react";
import { LinkProps } from "next/link";
import { ReactNode } from "react";

export type Props = ButtonProps & {
  href?: LinkProps["href"];
  target?: string;
  children: ReactNode;
  textProps?: TextProps;
  pressableButton?: boolean;
  linkStyleProps?: Record<string, any>;
};
