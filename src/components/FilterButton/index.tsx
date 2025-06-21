import { Button, ButtonProps } from "@chakra-ui/react";

export type FilterButtonProps = ButtonProps & {
  onClick?: () => void;
  children: React.ReactNode;
};

export const FilterButton: React.FC<FilterButtonProps> = (props) => {
  const { children, onClick, ...restProps } = props;
  return (
    <Button
      onClick={onClick}
      size="2xs"
      paddingBlock={3.5}
      paddingInline={6}
      color="white"
      width={"100%"}
      borderRadius="full"
      textTransform="uppercase"
      fontWeight="normal"
      bg="primary.400"
      _hover={{ bg: "#234A38" }}
      {...restProps}
    >
      {children}
    </Button>
  );
};
