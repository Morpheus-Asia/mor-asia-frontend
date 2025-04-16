"use client";
import { Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import ContainerWrapper from "../ContainerWrapper";
import DescriptionRenderer from "./DescriptionRenderer";
import { FaHashtag } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const JoinUsSection: React.FC<any> = (props) => {
  const { locale, title, description, body, href } = props;
  // =============== HOOKS
  const router = useRouter();
  const pathname = usePathname();

  // =============== STATE
  const [isHovered, setIsHovered] = useState(false);

  // =============== API

  // =============== EVENTS
  const onHandleClick = () => {
    router.push(`#${href ?? ""}`, { scroll: true }); // Updates the URL with hash
  };

  // =============== EFFECTS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      if (hash === href) {
        document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, href]);
  // =============== VARIABLES

  // =============== RENDER FUNCTIONS

  // =============== VIEWS
  return (
    <section id={href} style={{ scrollMarginTop: "10rem", width: "100%" }}>
      <ContainerWrapper pt={"1rem"}>
        <VStack alignItems={"flex-start"} width={{ base: "100%", lg: "85%" }}>
          <VStack gap={6} alignItems={"flex-start"} width={"100%"}>
            <HStack
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={4}
            >
              <Heading color="white" fontSize={"3xl"} id={href}>
                {title}
              </Heading>
              <Icon
                color="primary.600"
                size="lg"
                cursor={"pointer"}
                textDecoration={"underline"}
                borderBottom={"2px solid"}
                borderBlockColor={"primary.600"}
                onClick={onHandleClick}
                visibility={isHovered ? "visible" : "hidden"}
              >
                <FaHashtag />
              </Icon>
            </HStack>
            <Text color="secondaryText.500">{description}</Text>
            <DescriptionRenderer body={body} locale={locale} />
          </VStack>
        </VStack>
      </ContainerWrapper>
    </section>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default JoinUsSection;
