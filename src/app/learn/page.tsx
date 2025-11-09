'use client';

import { Box, Container, Heading, Text, VStack, Link, Grid, HStack } from "@chakra-ui/react";

export default function LearnPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="3rem" align="stretch">
          {/* Foundational Concepts Section */}
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", sm: "3rem", md: "3.5rem" }}
              fontWeight="bold"
              mb="1rem"
              letterSpacing="0.02em"
              lineHeight="1.3"
            >
              Learn The Foundational Morpheus Concepts
            </Heading>
            <Box 
              h="4px" 
              w="80px" 
              bg="#1fdc8f" 
              mb="2rem"
            />
            
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
              gap="2rem"
              mb="2rem"
            >
              {/* Morpheus GitBook Documentation Card */}
              <Link
                href="https://gitbook.mor.org/"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  h="100%"
                  p="2rem"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="2px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="12px"
                  transition="all 0.3s"
                  _hover={{
                    bg: "rgba(31, 220, 143, 0.05)",
                    borderColor: "#1fdc8f",
                    transform: "translateY(-4px)",
                  }}
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "1.25rem", md: "1.5rem" }}
                    fontWeight="bold"
                    mb="1rem"
                    color="#1fdc8f"
                  >
                    Morpheus GitBook Documentation
                  </Heading>
                  <Text
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    color="white"
                    lineHeight="1.7"
                  >
                    The primary documentation resource covering foundational concepts, architecture, tokenomics, and implementation details of the Morpheus ecosystem.
                  </Text>
                </Box>
              </Link>

              {/* Lumerin Compute Infrastructure Card */}
              <Link
                href="https://gitbook.mor.lumerin.io/"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  h="100%"
                  p="2rem"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="2px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="12px"
                  transition="all 0.3s"
                  _hover={{
                    bg: "rgba(31, 220, 143, 0.05)",
                    borderColor: "#1fdc8f",
                    transform: "translateY(-4px)",
                  }}
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "1.25rem", md: "1.5rem" }}
                    fontWeight="bold"
                    mb="1rem"
                    color="#1fdc8f"
                  >
                    Lumerin Compute Infrastructure
                  </Heading>
                  <Text
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    color="white"
                    lineHeight="1.7"
                  >
                    Learn about the compute layer powering Morpheus&apos;s decentralized AI capabilities, compute provider setup, and distributed infrastructure.
                  </Text>
                </Box>
              </Link>

              {/* Brainpower Podcast Card */}
              <Link
                href="https://www.youtube.com/@brainpower_podcast"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  h="100%"
                  p="2rem"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="2px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="12px"
                  transition="all 0.3s"
                  _hover={{
                    bg: "rgba(31, 220, 143, 0.05)",
                    borderColor: "#1fdc8f",
                    transform: "translateY(-4px)",
                  }}
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "1.25rem", md: "1.5rem" }}
                    fontWeight="bold"
                    mb="1rem"
                    color="#1fdc8f"
                  >
                    Brainpower Podcast
                  </Heading>
                  <Text
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    color="white"
                    lineHeight="1.7"
                  >
                    Dive deeper into decentralized AI with conversations featuring industry leaders, technical deep dives, and the future of AI and blockchain.
                  </Text>
                </Box>
              </Link>
            </Grid>

            {/* Community Support Section */}
            <Box
              p={{ base: "1.5rem", md: "2rem" }}
              bg="rgba(31, 220, 143, 0.05)"
              border="1px solid rgba(31, 220, 143, 0.2)"
              borderRadius="12px"
            >
              <Text
                fontSize={{ base: "1rem", md: "1.125rem" }}
                color="white"
                lineHeight="1.7"
                mb="1rem"
              >
                Have questions? Join our community on Discord and Telegram for support and discussions.
              </Text>
              <HStack gap="1rem" flexWrap="wrap">
                <Link
                  href="https://discord.gg/morpheus"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    as="button"
                    px="1.5rem"
                    py="0.75rem"
                    bg="#1fdc8f"
                    color="black"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    borderRadius="8px"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(31, 220, 143, 0.4)",
                    }}
                  >
                    Join Discord
                  </Box>
                </Link>
                <Link
                  href="https://t.me/MorpheusAsia"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    as="button"
                    px="1.5rem"
                    py="0.75rem"
                    bg="transparent"
                    color="white"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    border="2px solid #1fdc8f"
                    borderRadius="8px"
                    transition="all 0.3s"
                    _hover={{
                      bg: "rgba(31, 220, 143, 0.1)",
                      transform: "translateY(-2px)",
                    }}
                  >
                    Join Telegram
                  </Box>
                </Link>
              </HStack>
            </Box>
          </Box>

          {/* API Documentation Section */}
          <Box
            p={{ base: "2rem", md: "3rem" }}
            bg="rgba(255, 255, 255, 0.03)"
            border="2px solid rgba(255, 255, 255, 0.1)"
            borderRadius="12px"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.25rem" }}
              fontWeight="bold"
              mb="1.5rem"
              color="white"
            >
              Decentralized AI Inference
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              color="white"
              lineHeight="1.8"
              mb="2rem"
            >
              Are you trying to create an application that needs decentralized AI inference?
            </Text>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.8"
              mb="2rem"
            >
              Our comprehensive API documentation provides everything you need to integrate Morpheus&apos;s decentralized AI capabilities into your application. Access detailed endpoint documentation, authentication methods, request/response formats, and code examples to get started quickly.
            </Text>
            <Link
              href="https://apidocs.mor.org/"
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
                fontSize={{ base: "1rem", md: "1.125rem" }}
                fontWeight="bold"
                borderRadius="8px"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(31, 220, 143, 0.4)",
                }}
              >
                View API Documentation →
              </Box>
            </Link>
          </Box>

          {/* MOR Builders Section */}
          <Box
            p={{ base: "2rem", md: "3rem" }}
            bg="rgba(31, 220, 143, 0.05)"
            border="2px solid rgba(31, 220, 143, 0.2)"
            borderRadius="12px"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.75rem", md: "2.25rem" }}
              fontWeight="bold"
              mb="1.5rem"
              color="white"
            >
              Morpheus Builder Subnets
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              color="white"
              lineHeight="1.8"
              mb="1.5rem"
            >
              Do you have a company or organization with a tech-savvy market, and want a new method to sell and increase conversions?
            </Text>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.8"
              mb="1.5rem"
            >
              MorBuilders is our partner that helps to do this and will provide white-glove assistance to get your company registered. This is a new method to sell services, where instead of asking for a monthly subscription, you ask for a stake of MOR tokens for your subnet.
            </Text>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.8"
              mb="2rem"
            >
              By becoming a registered builder, your organization can leverage the power of token staking to drive engagement and create a sustainable revenue model that aligns with the decentralized ecosystem, and the Morpheus decentralized community to obtain funding for your organization without giving away any equity. You&apos;ll be listed alongside other builders who are pioneering this new approach.
            </Text>
            <HStack gap="1rem" flexWrap="wrap">
              <Link
                href="https://morbuilders.xyz/"
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
                  fontSize={{ base: "1rem", md: "1.125rem" }}
                  fontWeight="bold"
                  borderRadius="8px"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(31, 220, 143, 0.4)",
                  }}
                >
                  Get Started with MorBuilders →
                </Box>
              </Link>
              <Link
                href="https://dashboard.mor.org/builders?sort=totalStaked-desc"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  as="button"
                  px="2.5rem"
                  py="1rem"
                  bg="transparent"
                  color="white"
                  fontSize={{ base: "1rem", md: "1.125rem" }}
                  fontWeight="bold"
                  border="2px solid #1fdc8f"
                  borderRadius="8px"
                  transition="all 0.3s"
                  _hover={{
                    bg: "rgba(31, 220, 143, 0.1)",
                    transform: "translateY(-2px)",
                  }}
                >
                  View Builders List →
                </Box>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
