'use client';

import { Box, Container, Heading, Text, VStack, Input, HStack } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="500px" px={{ base: "1rem", md: "2rem" }}>
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
              Sign Up
            </Heading>
            <Box 
              h="4px" 
              w="80px" 
              bg="#1fdc8f" 
              mx="auto"
            />
          </Box>

          {/* Form */}
          <Box
            p={{ base: "1.5rem", md: "2.5rem" }}
            bg="rgba(255, 255, 255, 0.03)"
            border="2px solid rgba(255, 255, 255, 0.1)"
            borderRadius="0"
          >
            <VStack gap="1.5rem" align="stretch">
              {/* Name Input */}
              <Box>
                <Text
                  fontSize="1rem"
                  color="white"
                  mb="0.75rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  fontWeight="bold"
                >
                  Name
                </Text>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="0"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  _placeholder={{ color: 'rgba(255, 255, 255, 0.4)' }}
                  _hover={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  _focus={{
                    borderColor: '#1fdc8f',
                    boxShadow: '0 0 0 1px #1fdc8f',
                  }}
                />
              </Box>

              {/* Email Input */}
              <Box>
                <Text
                  fontSize="1rem"
                  color="white"
                  mb="0.75rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  fontWeight="bold"
                >
                  Email
                </Text>
                <HStack gap="0.75rem">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    borderRadius="0"
                    color="white"
                    fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                    flex="1"
                    _placeholder={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    _hover={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    _focus={{
                      borderColor: '#1fdc8f',
                      boxShadow: '0 0 0 1px #1fdc8f',
                    }}
                  />
                  <Box
                    as="button"
                    bg={codeSent ? "rgba(31, 220, 143, 0.2)" : "#1fdc8f"}
                    color={codeSent ? "#1fdc8f" : "black"}
                    fontSize="0.875rem"
                    fontWeight="bold"
                    fontFamily="MOS"
                    px="1.25rem"
                    py="0.875rem"
                    borderRadius="0"
                    textTransform="uppercase"
                    transition="all 0.2s"
                    whiteSpace="nowrap"
                    border={codeSent ? "1px solid #1fdc8f" : "none"}
                    onClick={() => setCodeSent(true)}
                    _hover={{ bg: codeSent ? "rgba(31, 220, 143, 0.3)" : "#18c57d" }}
                  >
                    {codeSent ? "Resend" : "Send Code"}
                  </Box>
                </HStack>
              </Box>

              {/* Code Input */}
              <Box>
                <Text
                  fontSize="1rem"
                  color="white"
                  mb="0.75rem"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  fontWeight="bold"
                >
                  Verification Code
                </Text>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  size="lg"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="0"
                  color="white"
                  fontFamily="'Helvetica Neue', Helvetica, sans-serif"
                  letterSpacing="0.25em"
                  _placeholder={{ color: 'rgba(255, 255, 255, 0.4)', letterSpacing: 'normal' }}
                  _hover={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  _focus={{
                    borderColor: '#1fdc8f',
                    boxShadow: '0 0 0 1px #1fdc8f',
                  }}
                />
              </Box>

              {/* Sign Up Button */}
              <Box
                as="button"
                bg="#1fdc8f"
                color="black"
                fontSize="1rem"
                fontWeight="bold"
                fontFamily="MOS"
                px="2rem"
                py="1rem"
                borderRadius="0"
                textTransform="uppercase"
                transition="all 0.2s"
                mt="0.5rem"
                _hover={{ bg: "#18c57d" }}
              >
                Create Account
              </Box>
            </VStack>
          </Box>

          {/* Sign In Link */}
          <Box textAlign="center">
            <Text
              fontSize="1.125rem"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              fontWeight="bold"
            >
              Already have an account?{' '}
              <Link href="/sign-in">
                <Text
                  as="span"
                  color="#1fdc8f"
                  cursor="pointer"
                  fontWeight="bold"
                  _hover={{ color: '#18c57d', textDecoration: 'underline' }}
                >
                  Sign in
                </Text>
              </Link>
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
