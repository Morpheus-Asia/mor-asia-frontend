import { Separator } from "@chakra-ui/react";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Divider: React.FC<Props> = (props) => {
  const {
    size = "sm",
    variant = "solid",
    color = "rgba(255, 255, 255, 0.06",
  } = props;

  // =============== VIEWS
  return (
    <Separator size={size} borderColor={color} variant={variant} width="100%" />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Divider;
