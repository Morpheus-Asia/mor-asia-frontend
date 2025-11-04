import { Box, Container, Heading, Text, VStack, HStack } from "@chakra-ui/react";

export default function EventsPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "4rem", md: "8rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="4rem" align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", sm: "3rem", md: "4rem" }}
              fontWeight="bold"
              mb="1.5rem"
              letterSpacing="0.02em"
              color="white"
            >
              Events
            </Heading>
            <Text
              fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
              px={{ base: "1rem", md: "0" }}
            >
              Join us for workshops, meetups, and community gatherings
            </Text>
          </Box>

          {/* Upcoming Event */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", sm: "1.75rem", md: "2rem" }}
              fontWeight="bold"
              mb="2rem"
              color="white"
            >
              Upcoming Events
            </Heading>

            <Box
              bg="rgba(255, 255, 255, 0.03)"
              border="2px solid #1fdc8f"
              p={{ base: "1.5rem", md: "3rem" }}
              transition="all 0.3s"
              _hover={{
                bg: "rgba(31, 220, 143, 0.05)",
                transform: { base: "none", md: "translateY(-4px)" },
              }}
            >
              <VStack align="stretch" gap="1.5rem">
                <HStack gap="1rem" flexWrap="wrap">
                  <Box
                    bg="rgba(31, 220, 143, 0.2)"
                    px="1rem"
                    py="0.5rem"
                    fontSize="0.875rem"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="#1fdc8f"
                  >
                    Workshop
                  </Box>
                  <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="rgba(255, 255, 255, 0.7)">
                    November 12, 2024
                  </Text>
                </HStack>

                <Heading
                  as="h3"
                  fontSize={{ base: "1.5rem", sm: "2rem", md: "2.5rem" }}
                  fontWeight="bold"
                  color="white"
                  lineHeight="1.3"
                >
                  HWUM Technopreneur Club Morpheus Workshop
                </Heading>

                <Text
                  fontSize={{ base: "1rem", md: "1.25rem" }}
                  lineHeight="1.8"
                  color="rgba(255, 255, 255, 0.9)"
                >
                  Join us for an interactive workshop on decentralized AI and the Morpheus ecosystem. 
                  Learn about building with AI agents, contributing to open-source development, and the future of Web3 AI.
                </Text>

                <HStack gap={{ base: "1rem", md: "2rem" }} pt="1rem" flexWrap="wrap">
                  <HStack gap="0.5rem">
                    <Text fontSize={{ base: "0.875rem", md: "1rem" }} fontWeight="bold" color="#1fdc8f">
                      📍 Location:
                    </Text>
                    <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="white">
                      HWUM Technopreneur Club
                    </Text>
                  </HStack>
                  <HStack gap="0.5rem">
                    <Text fontSize={{ base: "0.875rem", md: "1rem" }} fontWeight="bold" color="#1fdc8f">
                      🕐 Time:
                    </Text>
                    <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="white">
                      TBA
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
