import { Box } from "@chakra-ui/react";

export type SpacerProps = {};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Spacer: React.FC<SpacerProps> = (props) => {
  const { height } = props;
  // =============== HOOKS

  // =============== STATE

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES

  // =============== RENDER FUNCTIONS

  // =============== VIEWS
  return <Box h={height || 10} />;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Spacer;
