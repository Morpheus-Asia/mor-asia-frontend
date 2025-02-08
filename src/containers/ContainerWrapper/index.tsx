import { Container, ContainerProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type ContainerWrapperProps = ContainerProps & {
  children: ReactNode;
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const ContainerWrapper: React.FC<ContainerWrapperProps> = (props) => {
  const { children, ...restProps } = props;

  // =============== VIEWS
  return (
    <Container maxW={"7xl"} py={8} {...restProps}>
      {children}
    </Container>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default ContainerWrapper;
