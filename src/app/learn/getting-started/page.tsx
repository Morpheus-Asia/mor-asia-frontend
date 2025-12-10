import { Box, Heading, Text, VStack, Link, Code } from "@chakra-ui/react";

export default function GettingStartedPage() {
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
          Getting Started with Morpheus
        </Heading>
        <Text
          fontSize={{ base: "1.125rem", md: "1.25rem" }}
          color="rgba(255, 255, 255, 0.7)"
          lineHeight="1.6"
          maxW="700px"
        >
          Learn the fundamentals of the Morpheus decentralized AI network and start building your first smart agent.
        </Text>
      </Box>

      <Box h="1px" bg="rgba(255, 255, 255, 0.1)" />

      {/* Introduction */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1rem"
          color="white"
          lineHeight="1.4"
          id="introduction"
        >
          Introduction
        </Heading>
        <Text
          fontSize={{ base: "1rem", md: "1.0625rem" }}
          color="rgba(255, 255, 255, 0.8)"
          lineHeight="1.75"
          mb="1rem"
        >
          Morpheus is a decentralized AI network that combines blockchain technology with artificial intelligence to create 
          a transparent, open, and accessible platform for AI development. It enables developers to build smart agents, 
          deploy AI models, and create decentralized applications (dApps) that leverage AI capabilities.
        </Text>
        <Text
          fontSize={{ base: "1rem", md: "1.0625rem" }}
          color="rgba(255, 255, 255, 0.8)"
          lineHeight="1.75"
        >
          The network is powered by the <Code colorScheme="green" bg="rgba(31, 220, 143, 0.15)" color="#1fdc8f" px="0.5rem" py="0.25rem" borderRadius="4px">MOR</Code> token, which serves as the utility token for transactions, staking, and 
          governance within the ecosystem.
        </Text>
      </Box>

      {/* Key Concepts */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1.5rem"
          color="white"
          lineHeight="1.4"
          id="key-concepts"
        >
          Key Concepts
        </Heading>
        
        <VStack align="stretch" gap="2.5rem">
          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.375rem" }}
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Smart Agents
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
              mb="0.75rem"
            >
              Autonomous AI agents that can perform tasks, make decisions, and interact with other agents and users 
              on the network. They operate on a decentralized infrastructure and are powered by MOR tokens.
            </Text>
            <Box
              p="1rem"
              bg="rgba(31, 220, 143, 0.05)"
              borderLeft="3px solid #1fdc8f"
              borderRadius="4px"
            >
              <Text
                fontSize="0.9375rem"
                color="rgba(255, 255, 255, 0.9)"
                lineHeight="1.7"
              >
                <strong>Tip:</strong> Smart agents can be programmed to execute complex workflows and interact with multiple 
                services autonomously.
              </Text>
            </Box>
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
              Decentralized AI Inference
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              AI model inference that runs on a distributed network of compute providers, ensuring transparency, 
              reliability, and accessibility without relying on centralized servers. This approach provides:
            </Text>
            <Box as="ul" mt="0.75rem" ml="1.5rem" listStyleType="disc" spacing="0.5rem">
              <Box as="li" color="rgba(255, 255, 255, 0.8)" lineHeight="1.75" mb="0.5rem">
                <Text as="span" fontSize={{ base: "1rem", md: "1.0625rem" }}>
                  Enhanced privacy and data sovereignty
                </Text>
              </Box>
              <Box as="li" color="rgba(255, 255, 255, 0.8)" lineHeight="1.75" mb="0.5rem">
                <Text as="span" fontSize={{ base: "1rem", md: "1.0625rem" }}>
                  Reduced costs through competitive compute markets
                </Text>
              </Box>
              <Box as="li" color="rgba(255, 255, 255, 0.8)" lineHeight="1.75">
                <Text as="span" fontSize={{ base: "1rem", md: "1.0625rem" }}>
                  Improved reliability through distributed infrastructure
                </Text>
              </Box>
            </Box>
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
              Subnets
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Specialized networks within Morpheus that focus on specific use cases or communities. Builders can create 
              subnets and require MOR token staking for access, creating new monetization models.
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box h="1px" bg="rgba(255, 255, 255, 0.1)" />

      {/* Next Steps */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1rem"
          color="white"
          lineHeight="1.4"
          id="next-steps"
        >
          Next Steps
        </Heading>
        <Text
          fontSize={{ base: "1rem", md: "1.0625rem" }}
          color="rgba(255, 255, 255, 0.8)"
          lineHeight="1.75"
          mb="1.5rem"
        >
          Ready to dive deeper? Explore these resources to continue your journey:
        </Text>
        <VStack align="stretch" gap="0.75rem">
          <Link 
            href="/learn/documentation" 
            color="#1fdc8f" 
            fontSize={{ base: "1rem", md: "1.0625rem" }}
            _hover={{ textDecoration: 'underline', color: "#1fdc8f" }}
            fontWeight="500"
          >
            → Explore the Documentation
          </Link>
          <Link 
            href="/learn/api-docs" 
            color="#1fdc8f" 
            fontSize={{ base: "1rem", md: "1.0625rem" }}
            _hover={{ textDecoration: 'underline', color: "#1fdc8f" }}
            fontWeight="500"
          >
            → Check out the API Documentation
          </Link>
          <Link 
            href="/learn/community" 
            color="#1fdc8f" 
            fontSize={{ base: "1rem", md: "1.0625rem" }}
            _hover={{ textDecoration: 'underline', color: "#1fdc8f" }}
            fontWeight="500"
          >
            → Join the Community
          </Link>
        </VStack>
      </Box>
    </VStack>
  );
}
