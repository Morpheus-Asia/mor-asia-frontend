import { HStack, Icon, VStack } from "@chakra-ui/react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import CustomImage from "../Image";
import { get } from "lodash";
import { IoIosMenu } from "react-icons/io";
import LanguageSwitcher from "../LanguageSwitcher";
import { IoIosClose } from "react-icons/io";

import { Renderer } from "morpheus-asia/Renderer";
import { MobileNavBarProps } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const MobileNavbar: React.FC<MobileNavBarProps> = (props) => {
  const { data, locale } = props;

  // =============== HOOKS
  const { scrollY } = useScroll();

  // =============== STATE
  const [showBackground, setShowBackground] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // =============== EVENTS
  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  // =============== VARIABLES
  const logo = get(data, "navBarLogo.image", {});

  // =============== VIEWS
  return (
    <>
      <HStack
        hideFrom={"md"}
        width="100%"
        bg={showBackground ? "primary.400" : "transparent"}
        borderRadius={8}
        border={showBackground ? "1px solid #20DC8E" : "none"}
        py={1.5}
        px={2}
      >
        <HStack justifyContent={"space-between"} width="100%">
          <CustomImage data={logo} width={60} height={60} />
          <HStack>
            <LanguageSwitcher
              currentLocale={locale}
              showBackground={showBackground}
            />
            <Icon
              color="white"
              size="xl"
              cursor={"pointer"}
              onClick={() => setShowModal((prev) => !prev)}
            >
              {showModal ? <IoIosClose /> : <IoIosMenu />}
            </Icon>
          </HStack>
        </HStack>
      </HStack>
      {showModal && (
        <VStack
          bg="primary.400"
          mt={2}
          p={5}
          borderRadius={8}
          width="100%"
          border={showBackground ? "1px solid #20DC8E" : "none"}
        >
          <VStack gap={3} alignItems={"flex-start"} width="100%">
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
                      fontSize: "lg",
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
          </VStack>
        </VStack>
      )}
    </>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default MobileNavbar;
