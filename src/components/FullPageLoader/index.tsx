import { HStack, Spinner } from "@chakra-ui/react";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FullPageLoader: React.FC = () => {
  // =============== VIEWS
  return (
    <HStack height="100vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size="xl" color="primary.600" />
    </HStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FullPageLoader;
