"use client";
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { get, size } from "lodash";
import Button from "morpheus-asia/components/Button";
import { CustomImage } from "morpheus-asia/components/Image";
import ContainerWrapper from "../ContainerWrapper";
import { motion } from "framer-motion";
import { Props } from "./props";
import MarkdownRender from "morpheus-asia/components/Markdown";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Hero: React.FC<Props> = (props) => {
  const { heading, subHeading, ctaButtonList, heroImage } = props;

  // =============== VARIABLES
  const imageData = get(heroImage, "image", {});
  const headingText = get(heading, "text.[0].children.[0].text", "");
  const subHeadingText = get(subHeading, "text.[0].children.[0].text", "");
  const headingTextColor =
    heading?.color === "primary" ? "white" : "secondaryText.500";
  const subHeadingTextColor =
    subHeading?.color === "primary" ? "white" : "secondaryText.500";

  // =============== RENDER FUNCTION
  const renderButton = () => {
    if (size(ctaButtonList) === 1) {
      return (
        <Button
          visual={ctaButtonList?.[0]?.variant}
          href={ctaButtonList?.[0]?.url}
          target={ctaButtonList?.[0]?.target}
          icon={ctaButtonList?.[0]?.icon}
          hasArrow={ctaButtonList?.[0]?.hasArrow}
          iconHoverState={ctaButtonList?.[0]?.iconHoverState}
          disabled={ctaButtonList?.[0]?.isDisabled}
        >
          {ctaButtonList?.[0]?.text}
        </Button>
      );
    }
    return (
      <SimpleGrid columns={2} gap={5}>
        {ctaButtonList.map((ctaButton: any, index: any) => {
          return (
            <Button
              key={index}
              visual={ctaButton?.variant}
              size={{ base: "xl", lg: "2xl" }}
              fontSize={{ base: "sm", lg: "lg" }}
              href={ctaButton?.url}
              width={"full"}
              target={ctaButton?.target}
              icon={ctaButton?.icon}
              hasArrow={ctaButton?.hasArrow}
              iconHoverState={ctaButton?.iconHoverState}
              disabled={ctaButton?.isDisabled}
            >
              {ctaButton?.text}
            </Button>
          );
        })}
      </SimpleGrid>
    );
  };

  // =============== VIEWS
  return (
    <Box
      background={
        "radial-gradient(214.33% 73.68% at 50% 127.49%,#010906 0,#010906 11.79%,#010906 21.38%,#010a06 29.12%,#010b07 35.34%,#020b07 40.37%,#020c08 44.56%,#020d08 48.24%,#020e09 51.76%,#020f0a 55.44%,#02110b 59.63%,#02120b 64.66%,#03130c 70.88%,#03140d 78.62%,#03150d 88.21%,#03160e 100%)"
      }
      py={{ base: "2.5rem", lg: 20 }}
      width={"100%"}
    >
      <div>
        <ContainerWrapper pt={"1rem"} pb={"2rem"}>
          <VStack justifyContent={"center"} alignItems={"center"}>
            <VStack gap={6} textAlign={"center"}>
              <MarkdownRender
                text={headingText}
                components={{
                  p: (props: any) => {
                    return (
                      <Heading
                        fontSize={{ base: "3xl", md: "5xl" }}
                        color={headingTextColor}
                      >
                        {props.children}
                      </Heading>
                    );
                  },
                }}
              />
              <MarkdownRender
                text={subHeadingText}
                components={{
                  p: (props: any) => {
                    return (
                      <Text
                        fontSize={"lg"}
                        color={subHeadingTextColor}
                        fontWeight={"bold"}
                      >
                        {props.children}
                      </Text>
                    );
                  },
                }}
              />
            </VStack>
            <VStack gap={10}>
              <motion.div
                animate={{
                  y: ["0px", "-25px", "0px"], // Up and down movement
                }}
                transition={{
                  duration: 3, // Duration of one cycle
                  repeat: Infinity, // Infinite loop
                  repeatType: "loop", // Looping animation
                  ease: "easeInOut", // Smooth easing
                }}
              >
                <CustomImage data={imageData} />
              </motion.div>
              {renderButton()}
            </VStack>
          </VStack>
        </ContainerWrapper>
      </div>
    </Box>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Hero;
