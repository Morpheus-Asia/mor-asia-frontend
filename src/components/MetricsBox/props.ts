import { SkeletonProps, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type Props = StackProps & {
  children: ReactNode;
  isLoading?: boolean;
  skeletonProps?: SkeletonProps;
};
