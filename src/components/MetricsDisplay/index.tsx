import { Text, VStack } from "@chakra-ui/react";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const MetricsDisplay: React.FC<Props> = (props) => {
  const { title, value, ...restProps } = props;
  // =============== HOOKS

  // =============== STATE

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES

  // =============== RENDER FUNCTIONS

  // =============== VIEWS
  return (
    <VStack
      {...restProps}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      height={"100%"}
      gap={2.5}
    >
      <Text
        textTransform={"uppercase"}
        color={"rgba(255, 255, 255, 0.8)"}
        fontWeight={"semibold"}
        fontSize={{ md: ".8rem", lg: ".875rem" }}
      >
        {title}
      </Text>
      <Text
        fontWeight={"bold"}
        fontSize={{
          base: "1.5rem",
          sm: "1.3rem",
          md: "1.4rem",
          lg: "1.5rem",
          xl: "1.875rem",
        }}
        textTransform={"uppercase"}
        color="#FFF"
      >
        {value}
      </Text>
    </VStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default MetricsDisplay;
