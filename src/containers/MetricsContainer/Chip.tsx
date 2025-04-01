import { Badge, Text } from "@chakra-ui/react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

interface PercentageChipProps {
  value: number;
}

const PercentageChip: React.FC<PercentageChipProps> = ({ value }) => {
  const isPositive = value >= 0;

  return (
    <Badge
      display="flex"
      alignItems="center"
      gap={1}
      px={2}
      size={"sm"}
      py={1}
      borderRadius="full"
      fontWeight="bold"
      colorPalette={isPositive ? "green" : "red"}
    >
      {isPositive ? <FaCaretUp /> : <FaCaretDown />}
      <Text>{value?.toFixed(2)}%</Text>
    </Badge>
  );
};

export default PercentageChip;
