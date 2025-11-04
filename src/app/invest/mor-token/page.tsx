import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react";

export default function MorTokenPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "4rem", md: "8rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="3rem" align="stretch">
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
              MOR Token
            </Heading>
            <Text
              fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
              px={{ base: "1rem", md: "0" }}
            >
              The native token powering the Morpheus decentralized AI network
            </Text>
          </Box>

          {/* Main Content */}
          <Box
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            p={{ base: "1.5rem", md: "3rem" }}
          >
            <VStack align="stretch" gap="2rem">
              <Heading
                as="h2"
                fontSize={{ base: "1.5rem", md: "2rem" }}
                fontWeight="bold"
                color="white"
                mb="1rem"
              >
                What is MOR?
              </Heading>

              <Text
                fontSize={{ base: "1rem", md: "1.25rem" }}
                lineHeight="1.8"
                color="white"
              >
                MOR is the utility token of the Morpheus network, a decentralized AI infrastructure that enables users to access, deploy, and interact with AI agents. The token serves multiple purposes within the ecosystem:
              </Text>

              <VStack align="stretch" gap="1rem" pl={{ base: "1rem", md: "1.5rem" }}>
                <Text fontSize={{ base: "1rem", md: "1.125rem" }} lineHeight="1.8" color="white">
                  • <strong>Access AI Services:</strong> Use MOR to interact with AI agents and services on the network
                </Text>
                <Text fontSize={{ base: "1rem", md: "1.125rem" }} lineHeight="1.8" color="white">
                  • <strong>Compute Provider Rewards:</strong> Earn MOR by providing computational resources
                </Text>
                <Text fontSize={{ base: "1rem", md: "1.125rem" }} lineHeight="1.8" color="white">
                  • <strong>Network Governance:</strong> Participate in protocol decisions and upgrades
                </Text>
                <Text fontSize={{ base: "1rem", md: "1.125rem" }} lineHeight="1.8" color="white">
                  • <strong>Staking:</strong> Stake tokens to support network security and earn rewards
                </Text>
              </VStack>

              <Box pt="2rem">
                <Link
                  href="https://www.coingecko.com/en/coins/morpheusai"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    as="button"
                    bg="#1fdc8f"
                    color="black"
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    fontWeight="bold"
                    fontFamily="MOS"
                    px={{ base: "2rem", md: "2.5rem" }}
                    py={{ base: "1rem", md: "1.25rem" }}
                    borderRadius="0"
                    textTransform="uppercase"
                    transition="all 0.2s"
                    _hover={{ bg: "#18c57d" }}
                    width={{ base: "100%", sm: "auto" }}
                  >
                    View on CoinGecko
                  </Box>
                </Link>
              </Box>
            </VStack>
          </Box>

          {/* Additional Info Box */}
          <Box
            bg="rgba(31, 220, 143, 0.1)"
            border="2px solid #1fdc8f"
            p={{ base: "1.5rem", md: "2.5rem" }}
            textAlign="center"
          >
            <Heading
              as="h3"
              fontSize={{ base: "1.5rem", md: "1.75rem" }}
              fontWeight="bold"
              mb="1rem"
              color="white"
            >
              Want to Learn More?
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              mb="1.5rem"
              color="white"
              lineHeight="1.7"
            >
              Explore our documentation and resources to understand how MOR powers the decentralized AI revolution.
            </Text>
            <Link
              href="/learn"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                as="button"
                bg="transparent"
                color="white"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px="2rem"
                py="1rem"
                border="2px solid white"
                borderRadius="0"
                textTransform="uppercase"
                transition="all 0.2s"
                _hover={{ 
                  bg: "white",
                  color: "black"
                }}
                width={{ base: "100%", sm: "auto" }}
              >
                Visit Learn Page
              </Box>
            </Link>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
