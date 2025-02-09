import { TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type Props = TextProps & {
  children: ReactNode;
};
