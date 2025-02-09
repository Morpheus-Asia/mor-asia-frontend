import { Text as ChakraText } from "@chakra-ui/react";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Text: React.FC<Props> = (props) => {
  const { children } = props;

  // =============== VIEWS
  return <ChakraText color="white">{children}</ChakraText>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Text;
