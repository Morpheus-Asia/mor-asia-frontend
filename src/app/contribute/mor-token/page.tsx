'use client';

import { Box, Container, Heading, Text, VStack, HStack, Link, Grid } from "@chakra-ui/react";

export default function MORTokenPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="4rem" align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", md: "4rem" }}
              fontWeight="bold"
              mb="1.5rem"
              letterSpacing="0.02em"
              lineHeight="1.2"
            >
              MOR Token
            </Heading>
            <Box 
              h="4px" 
              w="80px" 
              bg="#1fdc8f" 
              mb="2rem"
              mx="auto"
            />
            <Text
              fontSize="1.5rem"
              color="white"
              maxW="900px"
              mx="auto"
              lineHeight="1.8"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              The native utility token powering the Morpheus decentralized AI network
            </Text>
          </Box>

          {/* What is MOR Section */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.5rem" }}
              fontWeight="bold"
              mb="2rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              lineHeight="1.2"
            >
              What is MOR?
            </Heading>
            <Text
              fontSize="1.25rem"
              color="white"
              lineHeight="1.8"
              mb="1.5rem"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              MOR is the native utility token of the Morpheus network, designed to coordinate and 
              incentivize the decentralized AI ecosystem. It serves as the medium of exchange for 
              accessing AI services, rewarding compute providers, and governing the network&apos;s future 
              development.
            </Text>
            <Text
              fontSize="1.25rem"
              color="white"
              lineHeight="1.8"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              By holding and using MOR tokens, participants gain access to a global network of AI 
              models and computing resources while contributing to the growth of decentralized artificial 
              intelligence.
            </Text>
          </Box>

          {/* Key Features Grid */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.5rem" }}
              fontWeight="bold"
              mb="2rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              lineHeight="1.2"
            >
              Key Features
            </Heading>
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
              gap="2rem"
            >
              <Box
                p="2rem"
                bg="rgba(255, 255, 255, 0.03)"
                border="2px solid rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(31, 220, 143, 0.05)",
                  borderColor: "#1fdc8f",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="#1fdc8f"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Access to AI Services
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Use MOR tokens to access a wide range of AI models and services on the 
                  Morpheus network. Pay only for what you use with transparent, decentralized pricing.
                </Text>
              </Box>

              <Box
                p="2rem"
                bg="rgba(255, 255, 255, 0.03)"
                border="2px solid rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(31, 220, 143, 0.05)",
                  borderColor: "#1fdc8f",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="#1fdc8f"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Compute Provider Rewards
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Earn MOR tokens by providing computational resources to the network. Contribute 
                  your GPU power and get rewarded for enabling decentralized AI inference.
                </Text>
              </Box>

              <Box
                p="2rem"
                bg="rgba(255, 255, 255, 0.03)"
                border="2px solid rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(31, 220, 143, 0.05)",
                  borderColor: "#1fdc8f",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="#1fdc8f"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Staking & Governance
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Stake your MOR tokens to participate in network governance. Vote on proposals, 
                  protocol upgrades, and help shape the future of decentralized AI.
                </Text>
              </Box>

              <Box
                p="2rem"
                bg="rgba(255, 255, 255, 0.03)"
                border="2px solid rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(31, 220, 143, 0.05)",
                  borderColor: "#1fdc8f",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="#1fdc8f"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Fair Distribution
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  MOR follows a fair launch model with no pre-mine or VC allocation. Tokens are 
                  distributed to community members, builders, compute providers, and capital contributors.
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Token Distribution */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.5rem" }}
              fontWeight="bold"
              mb="2rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              lineHeight="1.2"
            >
              Token Distribution
            </Heading>
            <VStack gap="1.5rem" align="stretch">
              <Box
                p="1.5rem"
                bg="rgba(255, 255, 255, 0.03)"
                borderLeft="4px solid #1fdc8f"
                borderRadius="8px"
              >
                <HStack justify="space-between" mb="0.5rem">
                  <Text fontSize="1.25rem" fontWeight="bold" color="white" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    Capital Providers
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    24%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="white" lineHeight="1.7" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                  Contributors who provide stETH to bootstrap protocol-owned liquidity
                </Text>
              </Box>

              <Box
                p="1.5rem"
                bg="rgba(255, 255, 255, 0.03)"
                borderLeft="4px solid #1fdc8f"
                borderRadius="8px"
              >
                <HStack justify="space-between" mb="0.5rem">
                  <Text fontSize="1.25rem" fontWeight="bold" color="white" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    Compute Providers
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    24%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="white" lineHeight="1.7" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                  Node operators providing computational resources for AI inference
                </Text>
              </Box>

              <Box
                p="1.5rem"
                bg="rgba(255, 255, 255, 0.03)"
                borderLeft="4px solid #1fdc8f"
                borderRadius="8px"
              >
                <HStack justify="space-between" mb="0.5rem">
                  <Text fontSize="1.25rem" fontWeight="bold" color="white" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    Community Builders
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    24%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="white" lineHeight="1.7" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                  Developers building applications, tools, and integrations on Morpheus
                </Text>
              </Box>

              <Box
                p="1.5rem"
                bg="rgba(255, 255, 255, 0.03)"
                borderLeft="4px solid #1fdc8f"
                borderRadius="8px"
              >
                <HStack justify="space-between" mb="0.5rem">
                  <Text fontSize="1.25rem" fontWeight="bold" color="white" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    Protection Fund
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                    4%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="white" lineHeight="1.7" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
                  Reserved for network security and protecting user funds
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* How to Get MOR */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.5rem" }}
              fontWeight="bold"
              mb="2rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              lineHeight="1.2"
            >
              How to Get MOR Tokens
            </Heading>
            <VStack gap="2rem" align="stretch">
              <Box>
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  1. Provide Capital
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Deposit stETH into the Morpheus protocol to earn MOR emissions. Your contribution 
                  helps build protocol-owned liquidity and earns you a proportional share of daily 
                  MOR distributions.
                </Text>
              </Box>

              <Box>
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  2. Run Compute Nodes
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Set up and operate compute nodes to provide AI inference services. Earn MOR tokens 
                  by contributing GPU resources and processing AI requests from users on the network.
                </Text>
              </Box>

              <Box>
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  3. Build on Morpheus
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Develop applications, smart contracts, or tools for the Morpheus ecosystem. 
                  Quality contributions that add value to the network can earn MOR through builder 
                  rewards and community grants.
                </Text>
              </Box>

              <Box>
                <Heading
                  as="h3"
                  fontSize="1.75rem"
                  fontWeight="bold"
                  mb="1rem"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  4. Trade on DEXs
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  Purchase MOR tokens on decentralized exchanges like Uniswap. Always verify the 
                  contract address and use reputable DEXs to ensure you&apos;re getting authentic MOR tokens.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Start HODLing MOR Section */}
          <Box
            p="3rem"
            bg="rgba(255, 255, 255, 0.03)"
            border="2px solid rgba(255, 255, 255, 0.1)"
            borderRadius="16px"
            textAlign="center"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.5rem" }}
              fontWeight="bold"
              mb="1.5rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              lineHeight="1.2"
            >
              Start HODLing MOR
            </Heading>
            <Text
              fontSize="1.25rem"
              color="white"
              lineHeight="1.8"
              mb="2.5rem"
              maxW="800px"
              mx="auto"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              Purchase MOR tokens on your preferred exchange and join the decentralized AI revolution.
            </Text>
            <HStack justify="center" gap="1.5rem" flexWrap="wrap">
              <Link
                href="https://www.coinbase.com/price/morpheus"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  as="button"
                  px="2.5rem"
                  py="1rem"
                  bg="#0052FF"
                  color="white"
                  fontSize="1.125rem"
                  fontWeight="bold"
                  borderRadius="8px"
                  transition="all 0.3s"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(0, 82, 255, 0.4)",
                    bg: "#0041CC",
                  }}
                >
                  Coinbase
                </Box>
              </Link>
              <Link
                href="https://app.uniswap.org/explore/tokens/arbitrum/0x092baadb7def4c3981454dd9c0a0d7ff07bcfc86"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  as="button"
                  px="2.5rem"
                  py="1rem"
                  bg="#FF007A"
                  color="white"
                  fontSize="1.125rem"
                  fontWeight="bold"
                  borderRadius="8px"
                  transition="all 0.3s"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(255, 0, 122, 0.4)",
                    bg: "#E6006D",
                  }}
                >
                  Uniswap
                </Box>
              </Link>
            </HStack>
          </Box>

          {/* CTA Section */}
          <Box
            p="3rem"
            bg="rgba(31, 220, 143, 0.05)"
            border="2px solid rgba(31, 220, 143, 0.2)"
            borderRadius="16px"
            textAlign="center"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.5rem" }}
              fontWeight="bold"
              mb="1.5rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              lineHeight="1.2"
            >
              Ready to Get Started?
            </Heading>
            <Text
              fontSize="1.25rem"
              color="white"
              lineHeight="1.8"
              mb="2.5rem"
              maxW="800px"
              mx="auto"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              Join the Morpheus ecosystem and start earning MOR tokens by contributing to 
              the future of decentralized AI.
            </Text>
            <HStack justify="center" gap="1.5rem" flexWrap="wrap">
              <Link
                href="https://gitbook.mor.org/"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  as="button"
                  px="2.5rem"
                  py="1rem"
                  bg="#1fdc8f"
                  color="black"
                  fontSize="1.125rem"
                  fontWeight="bold"
                  borderRadius="8px"
                  transition="all 0.3s"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(31, 220, 143, 0.4)",
                  }}
                >
                  Read Documentation
                </Box>
              </Link>
              <Link
                href="/learn"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  as="button"
                  px="2.5rem"
                  py="1rem"
                  bg="transparent"
                  color="white"
                  fontSize="1.125rem"
                  fontWeight="bold"
                  borderRadius="8px"
                  border="2px solid #1fdc8f"
                  transition="all 0.3s"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  _hover={{
                    bg: "rgba(31, 220, 143, 0.1)",
                    transform: "translateY(-2px)",
                  }}
                >
                  Learn More
                </Box>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
