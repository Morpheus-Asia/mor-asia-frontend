'use client';

import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const GlitchText = ({ children }: { children: string }) => {
  return (
    <Box
      position="relative"
      display="inline-block"
      css={{
        '&::before, &::after': {
          content: `"${children}"`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        '&::before': {
          color: '#1fdc8f',
          animation: 'glitch-1 2s infinite linear alternate-reverse',
          clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
        },
        '&::after': {
          color: '#ff0080',
          animation: 'glitch-2 3s infinite linear alternate-reverse',
          clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
        },
        '@keyframes glitch-1': {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-3px)' },
          '40%': { transform: 'translateX(3px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
          '100%': { transform: 'translateX(0)' },
        },
        '@keyframes glitch-2': {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(3px)' },
          '40%': { transform: 'translateX(-3px)' },
          '60%': { transform: 'translateX(3px)' },
          '80%': { transform: 'translateX(-3px)' },
          '100%': { transform: 'translateX(0)' },
        },
      }}
    >
      {children}
    </Box>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '404ERRORNOTFOUND';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.3) {
        drops[i] = Math.random() * -50;
      } else {
        drops[i] = -9999;
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 13, 14, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1fdc8f';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    />
  );
};

export default function NotFound() {
  return (
    <Box 
      as="main" 
      position="relative" 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      overflow="hidden"
    >
      <MatrixRain />

      <Container maxW="800px" position="relative" zIndex={1} textAlign="center" px="2rem">
        <VStack gap="2rem">
          {/* 404 Number */}
          <Heading
            as="h1"
            fontSize={{ base: "8rem", md: "12rem", lg: "16rem" }}
            fontWeight="bold"
            lineHeight="1"
            color="white"
            textShadow="0 0 60px rgba(31, 220, 143, 0.3)"
            letterSpacing="-0.05em"
          >
            <GlitchText>404</GlitchText>
          </Heading>

          {/* Error Message */}
          <VStack gap="1rem">
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem", lg: "2.5rem" }}
              fontWeight="bold"
              color="white"
            >
              Page Not Found
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              color="rgba(255, 255, 255, 0.7)"
              maxW="500px"
              lineHeight="1.7"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved to another dimension.
            </Text>
          </VStack>

          {/* Terminal-style message */}
          <Box
            bg="rgba(0, 0, 0, 0.5)"
            border="1px solid rgba(31, 220, 143, 0.3)"
            borderRadius="8px"
            p={{ base: "1rem", md: "1.5rem" }}
            w="100%"
            maxW="500px"
            textAlign="left"
            fontFamily="monospace"
          >
            <Text color="#1fdc8f" fontSize={{ base: "0.875rem", md: "1rem" }}>
              <Box as="span" color="rgba(255, 255, 255, 0.5)">$</Box> morpheus --find page
            </Text>
            <Text color="#ff6b6b" fontSize={{ base: "0.875rem", md: "1rem" }} mt="0.5rem">
              Error: Resource not found in the network
            </Text>
            <Text color="rgba(255, 255, 255, 0.5)" fontSize={{ base: "0.875rem", md: "1rem" }} mt="0.5rem">
              Suggestion: Navigate back to a known location
            </Text>
          </Box>

          {/* Action Buttons */}
          <VStack gap="1rem" mt="1rem">
            <Link href="/">
              <Button
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "1rem", md: "1.125rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "2rem", md: "3rem" }}
                py={{ base: "1.25rem", md: "1.5rem" }}
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                _hover={{ 
                  bg: "#18c57d", 
                  transform: "translateY(-2px)", 
                  boxShadow: "0 8px 24px rgba(31, 220, 143, 0.4)" 
                }}
                transition="all 0.2s"
              >
                Return Home
              </Button>
            </Link>
            <Link href="/learn">
              <Button
                bg="transparent"
                color="#1fdc8f"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "1.5rem", md: "2rem" }}
                py="1rem"
                h="auto"
                borderRadius="0"
                border="1px solid #1fdc8f"
                textTransform="uppercase"
                _hover={{ 
                  bg: "rgba(31, 220, 143, 0.1)", 
                }}
                transition="all 0.2s"
              >
                Explore Documentation
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

