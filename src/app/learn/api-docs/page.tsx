import { Box, Heading, Text, VStack, Link, Code } from "@chakra-ui/react";

export default function ApiDocsPage() {
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
          API Documentation
        </Heading>
        <Text
          fontSize={{ base: "1.125rem", md: "1.25rem" }}
          color="rgba(255, 255, 255, 0.7)"
          lineHeight="1.6"
          maxW="700px"
        >
          Integrate Morpheus&apos;s decentralized AI capabilities into your application with our comprehensive API documentation.
        </Text>
      </Box>

      <Box h="1px" bg="rgba(255, 255, 255, 0.1)" />

      {/* Overview */}
      <Box>
        <Text
          fontSize={{ base: "1rem", md: "1.0625rem" }}
          color="rgba(255, 255, 255, 0.8)"
          lineHeight="1.75"
        >
          Are you trying to create an application that needs decentralized AI inference? Our comprehensive API 
          documentation provides everything you need to integrate Morpheus&apos;s decentralized AI capabilities 
          into your application.
        </Text>
      </Box>

      {/* What You'll Find */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1.5rem"
          color="white"
          lineHeight="1.4"
          id="what-youll-find"
        >
          What You&apos;ll Find
        </Heading>
        <VStack align="stretch" gap="2rem">
          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.375rem" }}
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Endpoint Documentation
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Detailed documentation for all API endpoints, including request/response formats, parameters, and 
              example requests.
            </Text>
          </Box>

          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.375rem" }}
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Authentication Methods
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Learn how to authenticate your requests and securely access the Morpheus API using API keys and tokens.
            </Text>
          </Box>

          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.375rem" }}
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Code Examples
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Ready-to-use code examples in multiple programming languages to help you get started quickly.
            </Text>
          </Box>
        </VStack>
      </Box>

      {/* CTA */}
      <Box
        p="1.5rem"
        bg="rgba(31, 220, 143, 0.05)"
        borderLeft="3px solid #1fdc8f"
        borderRadius="4px"
      >
        <Text
          fontSize="1rem"
          color="rgba(255, 255, 255, 0.9)"
          lineHeight="1.75"
          mb="1rem"
        >
          Access the full API documentation with interactive examples and detailed endpoint specifications.
        </Text>
        <Link
          href="https://apidocs.mor.org/"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: 'none' }}
        >
          <Box
            as="button"
            px="2rem"
            py="0.75rem"
            bg="#1fdc8f"
            color="black"
            fontSize="1rem"
            fontWeight="600"
            borderRadius="6px"
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(31, 220, 143, 0.4)",
            }}
          >
            View API Documentation →
          </Box>
        </Link>
      </Box>
    </VStack>
  );
}
