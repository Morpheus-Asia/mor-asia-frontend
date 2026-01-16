'use client';

import { Box, Container, Heading, Text, VStack, Input, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "morpheus-asia/lib/auth-context";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: codeSent ? 'resend' : 'register',
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setCodeSent(true);
      setSuccess('Verification email sent! Check your inbox.');
    } catch (err) {
      console.error('Error sending code:', err);
      setError(err instanceof Error ? err.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!code) {
      setError('Please enter the verification code from your email');
      return;
    }

    setConfirming(true);
    setError(null);
    setSuccess(null);

    try {
      // Step 1: Confirm the email
      const confirmResponse = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'confirm',
          code: code.trim(),
        }),
      });

      const confirmData = await confirmResponse.json();

      if (!confirmResponse.ok) {
        throw new Error(confirmData.error || 'Failed to verify code');
      }

      setSuccess('Email confirmed! Logging you in...');

      // Step 2: Auto-login to get JWT (password is generated server-side from email)
      const loginResponse = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email: email,
        }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok && loginData.jwt && loginData.user) {
        // Store JWT and user data using auth context
        login(loginData.jwt, loginData.user);

        setSuccess('Welcome! Redirecting...');
        
        // Redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 500);
        return;
      }

      // Fallback: redirect to sign-in if auto-login fails
      setSuccess('Account confirmed! Redirecting to sign in...');
      setTimeout(() => {
        router.push('/sign-in');
      }, 1000);
    } catch (err) {
      console.error('Error confirming account:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify code');
    } finally {
      setConfirming(false);
    }
  };

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
                    onClick={handleSendCode}
                    opacity={loading ? 0.7 : 1}
                    cursor={loading ? 'not-allowed' : 'pointer'}
                    _hover={{ bg: loading ? undefined : (codeSent ? "rgba(31, 220, 143, 0.3)" : "#18c57d") }}
                  >
                    {loading ? "Sending..." : (codeSent ? "Resend" : "Send Code")}
                  </Box>
                </HStack>

                {/* Error Message */}
                {error && (
                  <Text
                    fontSize="0.875rem"
                    color="#ff6b6b"
                    mt="0.5rem"
                  >
                    {error}
                  </Text>
                )}

                {/* Success Message */}
                {success && (
                  <Text
                    fontSize="0.875rem"
                    color="#1fdc8f"
                    mt="0.5rem"
                  >
                    {success}
                  </Text>
                )}
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
                  placeholder="Paste verification code from email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                onClick={handleCreateAccount}
                opacity={confirming ? 0.7 : 1}
                cursor={confirming ? 'not-allowed' : 'pointer'}
                _hover={{ bg: confirming ? undefined : "#18c57d" }}
              >
                {confirming ? 'Verifying...' : 'Create Account'}
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
