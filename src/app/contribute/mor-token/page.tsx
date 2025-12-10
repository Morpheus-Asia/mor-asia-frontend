'use client';

import { Box, Heading, Text, VStack, HStack, Link, Grid } from "@chakra-ui/react";

export default function MORTokenPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt="3rem" pb="4rem">
      <Box px="1rem" w="100%">
        <VStack gap="4rem" align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize="4rem"
              fontWeight="bold"
              mb="1.5rem"
              letterSpacing="0.02em"
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
            >
              The native utility token powering the Morpheus decentralized AI network
            </Text>
          </Box>

          {/* What is MOR Section */}
          <Box>
            <Heading
              as="h2"
              fontSize="2.5rem"
              fontWeight="bold"
              mb="2rem"
              color="white"
            >
              What is MOR?
            </Heading>
            <Text
              fontSize="1.25rem"
              color="white"
              lineHeight="1.8"
              mb="1.5rem"
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
              fontSize="2.5rem"
              fontWeight="bold"
              mb="2rem"
              color="white"
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
                >
                  Access to AI Services
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
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
                >
                  Compute Provider Rewards
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
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
                >
                  Staking & Governance
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
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
                >
                  Fair Distribution
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.7"
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
              fontSize="2.5rem"
              fontWeight="bold"
              mb="2rem"
              color="white"
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
                  <Text fontSize="1.25rem" fontWeight="bold" color="white">
                    Capital Providers
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f">
                    24%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="rgba(255, 255, 255, 0.8)" lineHeight="1.7">
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
                  <Text fontSize="1.25rem" fontWeight="bold" color="white">
                    Compute Providers
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f">
                    24%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="rgba(255, 255, 255, 0.8)" lineHeight="1.7">
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
                  <Text fontSize="1.25rem" fontWeight="bold" color="white">
                    Community Builders
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f">
                    24%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="rgba(255, 255, 255, 0.8)" lineHeight="1.7">
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
                  <Text fontSize="1.25rem" fontWeight="bold" color="white">
                    Protection Fund
                  </Text>
                  <Text fontSize="1.25rem" fontWeight="bold" color="#1fdc8f">
                    4%
                  </Text>
                </HStack>
                <Text fontSize="1.125rem" color="rgba(255, 255, 255, 0.8)" lineHeight="1.7">
                  Reserved for network security and protecting user funds
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* How to Get MOR */}
          <Box>
            <Heading
              as="h2"
              fontSize="2.5rem"
              fontWeight="bold"
              mb="2rem"
              color="white"
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
                >
                  1. Provide Capital
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
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
                >
                  2. Run Compute Nodes
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
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
                >
                  3. Build on Morpheus
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
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
                >
                  4. Trade on DEXs
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="white"
                  lineHeight="1.8"
                  mb="1rem"
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
              fontSize="2.5rem"
              fontWeight="bold"
              mb="1.5rem"
              color="white"
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
              fontSize="2.5rem"
              fontWeight="bold"
              mb="1.5rem"
              color="white"
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
      </Box>
    </Box>
  );
}
