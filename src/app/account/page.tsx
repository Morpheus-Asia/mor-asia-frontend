'use client';

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "morpheus-asia/lib/auth-context";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  useEffect(() => {
    // Redirect to sign-up if not logged in
    if (!isLoading && !isLoggedIn) {
      router.push('/sign-up');
    }
  }, [isLoading, isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="600px" px={{ base: "1rem", md: "2rem" }}>
          <Box textAlign="center" py="4rem">
            <Text fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
              Loading...
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (!isLoggedIn || !user) {
    return null; // Will redirect
  }

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="600px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="2rem" align="stretch">
          {/* Header */}
          <Box textAlign="center" mb="1rem">
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", md: "3.5rem" }}
              fontWeight="bold"
              mb="1.5rem"
              letterSpacing="0.02em"
              color="white"
            >
              Account
            </Heading>
            <Box 
              h="4px" 
              w="80px" 
              bg="#1fdc8f" 
              mx="auto"
            />
          </Box>

          {/* Account Info */}
          <Box
            p={{ base: "1.5rem", md: "2.5rem" }}
            bg="rgba(255, 255, 255, 0.03)"
            border="2px solid rgba(255, 255, 255, 0.1)"
            borderRadius="0"
          >
            <VStack gap="1.5rem" align="stretch">
              {/* Email */}
              <Box>
                <Text
                  fontSize="0.875rem"
                  color="rgba(255, 255, 255, 0.5)"
                  mb="0.5rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  Email
                </Text>
                <Text
                  fontSize="1.25rem"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  fontWeight="bold"
                >
                  {user.email}
                </Text>
              </Box>

              {/* Member Since */}
              <Box>
                <Text
                  fontSize="0.875rem"
                  color="rgba(255, 255, 255, 0.5)"
                  mb="0.5rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  Member Since
                </Text>
                <Text
                  fontSize="1rem"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                >
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Logout Button */}
          <Box
            as="button"
            bg="transparent"
            color="#ff6b6b"
            fontSize="1rem"
            fontWeight="bold"
            fontFamily="MOS"
            px="2rem"
            py="1rem"
            borderRadius="0"
            border="2px solid #ff6b6b"
            textTransform="uppercase"
            transition="all 0.2s"
            onClick={handleLogout}
            _hover={{ 
              bg: "rgba(255, 107, 107, 0.1)",
            }}
          >
            Sign Out
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
