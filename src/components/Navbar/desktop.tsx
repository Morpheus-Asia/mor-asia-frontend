import { Box, VStack, HStack } from "@chakra-ui/react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import CustomImage from "../Image";
import { Renderer } from "morpheus-asia/Renderer";
import LanguageSwitcher from "../LanguageSwitcher";
import { get } from "lodash";
import Button from "../Button";
import { DesktopNavBarProps } from "./props";

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

/**
 * ===========================
 * MAIN
 * ===========================
 */

export const DesktopNavBar: React.FC<DesktopNavBarProps> = (props) => {
  const { data, locale } = props;

  // =============== HOOKS
  const { scrollY } = useScroll();

  // =============== STATE
  const [showBackground, setShowBackground] = useState(false);

  // =============== EVENTS
  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 50) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  // =============== VARIABLES
  const logo = get(data, "navBarLogo.image", {});

  // =============== VIEWS
  return (
    <MotionVStack
      display="flex"
      hideBelow={"md"}
      position="relative"
      justifyContent="space-between"
      rounded="md"
      py={3}
      mx="auto"
      animate={{
        width: showBackground ? "85%" : "100%",
        background: showBackground ? "var(--neutral-900)" : "transparent",
      }}
      {...(showBackground && { px: 4 })}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {showBackground && (
          <MotionBox
            key={String(showBackground)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            position="absolute"
            inset="0"
            height="full"
            width="full"
            bg="primary.400"
            pointerEvents="none"
            borderRadius={8}
          />
        )}
      </AnimatePresence>
      <HStack justifyContent={"space-between"} width="100%" zIndex={1}>
        <HStack gapX={6}>
          <CustomImage data={logo} width={70} height={70} />
          <Renderer
            items={data?.leftNavBarItems}
            locale={locale}
            propsMapper={(type, component) => {
              if (type === "shared.link") {
                return {
                  children: component?.text,
                  href: component?.url,
                  target: component?.target,
                  textProps: {
                    fontWeight: "medium",
                    _hover: {
                      textDecoration: "underline",
                      transition: "textDecoration 0.3s ease",
                    },
                  },
                };
              }
              if (type === "shared.button") {
                return {
                  children: component?.text,
                  variant: component?.variant,
                  href: component?.url,
                  target: component?.target,
                };
              }
            }}
          />
        </HStack>
        <HStack gap={4}>
          <Button>Join Now</Button>
          <Box>
            <LanguageSwitcher
              currentLocale={locale}
              showBackground={showBackground}
            />
          </Box>
        </HStack>
      </HStack>
    </MotionVStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default DesktopNavBar;
