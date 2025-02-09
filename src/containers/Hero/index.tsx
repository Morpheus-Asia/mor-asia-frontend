"use client";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { get } from "lodash";
import Button from "morpheus-asia/components/Button";
import { CustomImage } from "morpheus-asia/components/Image";
import ContainerWrapper from "../ContainerWrapper";
import { motion } from "framer-motion";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Hero: React.FC<Props> = (props) => {
  const { heading, subHeading, ctaButton, heroImage } = props;

  // =============== VARIABLES
  const imageData = get(heroImage, "image", {});

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
            <VStack gap={6}>
              <Heading fontSize={"5xl"} color="white">
                {heading}
              </Heading>
              <Text fontSize={"lg"} color="white" fontWeight={"bold"}>
                {subHeading}
              </Text>
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
              <Button>{ctaButton?.text}</Button>
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
