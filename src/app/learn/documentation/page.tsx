import { Box, Heading, Text, VStack, Grid, Link } from "@chakra-ui/react";

export default function DocumentationPage() {
  return (
    <VStack gap="3rem" align="stretch" maxW="900px">
      {/* Page Header */}
      <Box>
        <Heading
          as="h1"
          fontSize={{ base: "2.25rem", md: "2.75rem", lg: "3.25rem" }}
          fontWeight="bold"
          mb="1rem"
          color="white"
          lineHeight="1.2"
          letterSpacing="-0.02em"
        >
          Documentation Resources
        </Heading>
        <Text
          fontSize={{ base: "1.125rem", md: "1.25rem" }}
          color="rgba(255, 255, 255, 0.7)"
          lineHeight="1.6"
          maxW="700px"
        >
          Explore our comprehensive documentation covering all aspects of the Morpheus ecosystem, from foundational 
          concepts to advanced implementation guides.
        </Text>
      </Box>

      <Box h="1px" bg="rgba(255, 255, 255, 0.1)" />

      {/* Documentation Cards */}
      <Grid 
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
        gap="1.5rem"
      >
        {/* Morpheus GitBook Documentation */}
        <Link
          href="https://gitbook.mor.org/"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: 'none' }}
        >
          <Box
            h="100%"
            p="1.5rem"
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="8px"
            transition="all 0.2s"
            _hover={{
              bg: "rgba(31, 220, 143, 0.05)",
              borderColor: "#1fdc8f",
              transform: "translateY(-2px)",
            }}
          >
            <Heading
              as="h3"
              fontSize="1.125rem"
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Morpheus GitBook Documentation
            </Heading>
            <Text
              fontSize="0.9375rem"
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.7"
              mb="0.75rem"
            >
              The primary documentation resource covering foundational concepts, architecture, tokenomics, and 
              implementation details of the Morpheus ecosystem.
            </Text>
            <Text
              fontSize="0.875rem"
              color="#1fdc8f"
              fontWeight="500"
            >
              Read more →
            </Text>
          </Box>
        </Link>

        {/* Lumerin Compute Infrastructure */}
        <Link
          href="https://gitbook.mor.lumerin.io/"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: 'none' }}
        >
          <Box
            h="100%"
            p="1.5rem"
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="8px"
            transition="all 0.2s"
            _hover={{
              bg: "rgba(31, 220, 143, 0.05)",
              borderColor: "#1fdc8f",
              transform: "translateY(-2px)",
            }}
          >
            <Heading
              as="h3"
              fontSize="1.125rem"
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Lumerin Compute Infrastructure
            </Heading>
            <Text
              fontSize="0.9375rem"
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.7"
              mb="0.75rem"
            >
              Learn about the compute layer powering Morpheus&apos;s decentralized AI capabilities, compute provider 
              setup, and distributed infrastructure.
            </Text>
            <Text
              fontSize="0.875rem"
              color="#1fdc8f"
              fontWeight="500"
            >
              Read more →
            </Text>
          </Box>
        </Link>

        {/* Brainpower Podcast */}
        <Link
          href="https://www.youtube.com/@brainpower_podcast"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: 'none' }}
        >
          <Box
            h="100%"
            p="1.5rem"
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="8px"
            transition="all 0.2s"
            _hover={{
              bg: "rgba(31, 220, 143, 0.05)",
              borderColor: "#1fdc8f",
              transform: "translateY(-2px)",
            }}
          >
            <Heading
              as="h3"
              fontSize="1.125rem"
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Brainpower Podcast
            </Heading>
            <Text
              fontSize="0.9375rem"
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.7"
              mb="0.75rem"
            >
              Dive deeper into decentralized AI with conversations featuring industry leaders, technical deep dives, 
              and the future of AI and blockchain.
            </Text>
            <Text
              fontSize="0.875rem"
              color="#1fdc8f"
              fontWeight="500"
            >
              Watch now →
            </Text>
          </Box>
        </Link>
      </Grid>
    </VStack>
  );
}
