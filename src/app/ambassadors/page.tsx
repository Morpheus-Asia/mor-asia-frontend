'use client';

import { Box, Container, Heading, VStack } from "@chakra-ui/react";

export default function AmbassadorsPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1400px" px={{ base: "1rem", md: "2rem" }}>
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
              Ambassadors
            </Heading>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

