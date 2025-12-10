import { Box, Heading, Text, VStack, HStack, Link } from "@chakra-ui/react";

export default function CommunityPage() {
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
          Join the Community
        </Heading>
        <Text
          fontSize={{ base: "1.125rem", md: "1.25rem" }}
          color="rgba(255, 255, 255, 0.7)"
          lineHeight="1.6"
          maxW="700px"
        >
          Connect with developers, builders, and enthusiasts in the Morpheus ecosystem.
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
          Have questions? Join our community on Discord and Telegram for support, discussions, and to connect with 
          other builders and developers in the Morpheus ecosystem.
        </Text>
      </Box>

      {/* Community Channels */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1.5rem"
          color="white"
          lineHeight="1.4"
          id="community-channels"
        >
          Community Channels
        </Heading>
        <VStack align="stretch" gap="2rem">
          <Box
            p="1.5rem"
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="8px"
          >
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.375rem" }}
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Discord
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
              mb="1rem"
            >
              Join our Discord server for real-time discussions, technical support, and to connect with the community. 
              Get help with development, share your projects, and stay updated with the latest news.
            </Text>
            <Link
              href="https://discord.com/invite/ztPxPwwMuA"
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
                fontSize="0.9375rem"
                fontWeight="600"
                borderRadius="6px"
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(31, 220, 143, 0.4)",
                }}
              >
                Join Discord
              </Box>
            </Link>
          </Box>

          <Box
            p="1.5rem"
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="8px"
          >
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.375rem" }}
              fontWeight="600"
              mb="0.75rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Telegram
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
              mb="1rem"
            >
              Connect with the Morpheus Asia community on Telegram. Share updates, ask questions, and engage with 
              community members in Asia and beyond.
            </Text>
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
                fontSize="0.9375rem"
                fontWeight="600"
                border="1px solid #1fdc8f"
                borderRadius="6px"
                transition="all 0.2s"
                _hover={{
                  bg: "rgba(31, 220, 143, 0.1)",
                  transform: "translateY(-2px)",
                }}
              >
                Join Telegram
              </Box>
            </Link>
          </Box>
        </VStack>
      </Box>

      {/* Why Join */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1.5rem"
          color="white"
          lineHeight="1.4"
          id="why-join"
        >
          Why Join?
        </Heading>
        <VStack align="stretch" gap="1.5rem">
          <Box>
            <Heading
              as="h3"
              fontSize="1.125rem"
              fontWeight="600"
              mb="0.5rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Get Support
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Get help from experienced developers and community members when you encounter issues or have questions.
            </Text>
          </Box>

          <Box>
            <Heading
              as="h3"
              fontSize="1.125rem"
              fontWeight="600"
              mb="0.5rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Share Your Work
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Showcase your projects, get feedback, and inspire others in the community.
            </Text>
          </Box>

          <Box>
            <Heading
              as="h3"
              fontSize="1.125rem"
              fontWeight="600"
              mb="0.5rem"
              color="#1fdc8f"
              lineHeight="1.5"
            >
              Stay Updated
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Be the first to know about new features, updates, and opportunities in the Morpheus ecosystem.
            </Text>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}
