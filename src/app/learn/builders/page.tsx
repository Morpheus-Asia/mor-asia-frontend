import { Box, Heading, Text, VStack, HStack, Link } from "@chakra-ui/react";

export default function BuildersPage() {
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
          MorBuilders Program
        </Heading>
        <Text
          fontSize={{ base: "1.125rem", md: "1.25rem" }}
          color="rgba(255, 255, 255, 0.7)"
          lineHeight="1.6"
          maxW="700px"
        >
          A revolutionary approach to monetization through token staking for organizations and companies.
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
          Do you have a company or organization with a tech-savvy market, and want a new method to sell and increase 
          conversions? MorBuilders offers a revolutionary approach to monetization through token staking.
        </Text>
      </Box>

      {/* What is MorBuilders */}
      <Box
        p="1.5rem"
        bg="rgba(31, 220, 143, 0.05)"
        borderLeft="3px solid #1fdc8f"
        borderRadius="4px"
      >
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1rem"
          color="white"
          lineHeight="1.4"
          id="what-is-morbuilders"
        >
          What is MorBuilders?
        </Heading>
        <Text
          fontSize={{ base: "1rem", md: "1.0625rem" }}
          color="rgba(255, 255, 255, 0.9)"
          lineHeight="1.75"
          mb="1rem"
        >
          MorBuilders is our partner program that provides white-glove assistance to get your company registered. 
          This is a new method to sell services, where instead of asking for a monthly subscription, you ask for a 
          stake of MOR tokens for your subnet.
        </Text>
        <Text
          fontSize={{ base: "1rem", md: "1.0625rem" }}
          color="rgba(255, 255, 255, 0.9)"
          lineHeight="1.75"
        >
          By becoming a registered builder, your organization can leverage the power of token staking to drive 
          engagement and create a sustainable revenue model that aligns with the decentralized ecosystem.
        </Text>
      </Box>

      {/* Benefits */}
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontWeight="600"
          mb="1.5rem"
          color="white"
          lineHeight="1.4"
          id="benefits"
        >
          Benefits
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
              Token-Based Monetization
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Replace traditional subscription models with token staking, creating a more aligned and sustainable 
              revenue model.
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
              Community Funding
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Obtain funding for your organization from the Morpheus decentralized community without giving away any 
              equity.
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
              Builder Directory Listing
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.0625rem" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight="1.75"
            >
              Get listed alongside other builders who are pioneering this new approach to business monetization.
            </Text>
          </Box>
        </VStack>
      </Box>

      {/* CTA */}
      <HStack gap="1rem" flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
        <Link
          href="https://morbuilders.xyz/"
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
            px="2rem"
            py="0.75rem"
            bg="transparent"
            color="white"
            fontSize="1rem"
            fontWeight="600"
            border="1px solid #1fdc8f"
            borderRadius="6px"
            transition="all 0.2s"
            _hover={{
              bg: "rgba(31, 220, 143, 0.1)",
              transform: "translateY(-2px)",
            }}
          >
            View Builders List →
          </Box>
        </Link>
      </HStack>
    </VStack>
  );
}
