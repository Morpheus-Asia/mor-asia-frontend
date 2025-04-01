import { HStack, Skeleton } from "@chakra-ui/react";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const MetricsBox: React.FC<Props> = (props) => {
  const { children, isLoading, skeletonProps, ...restProps } = props;
  // =============== HOOKS

  // =============== STATE

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES

  // =============== RENDER FUNCTIONS

  // =============== VIEWS
  if (isLoading) {
    return <Skeleton height={150} {...skeletonProps} />;
  }
  return (
    <HStack
      background={"rgba(255, 255, 255, 0.05)"}
      px={6}
      py={5}
      borderRadius={8}
      alignItems={"flex-start"}
      {...restProps}
    >
      {children}
    </HStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default MetricsBox;
