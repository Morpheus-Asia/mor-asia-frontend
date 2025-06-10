import { Menu, Portal } from "@chakra-ui/react";
import { FilterButton } from "../FilterButton";
import { FaChevronDown } from "react-icons/fa";
import { map } from "lodash";

export type FilterMoreDropdownProps = {
  tags: string[];
  onHandleClick: (tag: string) => void;
};

export const FilterMoreDropdown: React.FC<FilterMoreDropdownProps> = (
  props
) => {
  const { tags, onHandleClick } = props;
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <FilterButton width={"fit-content"}>
          More{" "}
          <FaChevronDown style={{ marginLeft: 6, width: 12, height: 12 }} />
        </FilterButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg="#1C4532" borderRadius="lg" py={2}>
            {map(tags, (tag) => (
              <Menu.Item
                key={tag}
                value={tag}
                onSelect={() => onHandleClick(tag)}
                style={{
                  cursor: "pointer",
                  fontSize: 12,
                  color: "white",
                  textTransform: "uppercase",
                }}
                _hover={{ background: "#234A38" }}
                _highlighted={{ background: "#234A38" }}
              >
                {tag}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
