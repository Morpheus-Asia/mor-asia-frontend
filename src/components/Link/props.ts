import { TextProps } from "@chakra-ui/react";
import { LinkProps } from "next/link";
import { ReactNode } from "react";

export type Props = LinkProps & {
  children: ReactNode;
  textProps?: TextProps;
  active?: string;
  target?: string;
};
