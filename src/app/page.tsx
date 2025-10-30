'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Box, Container, Heading, Text, Grid, VStack } from "@chakra-ui/react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      // Skip 20% of columns randomly to reduce density
      if (Math.random() > 0.2) {
        drops[i] = Math.random() * -100;
      } else {
        drops[i] = -9999;
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

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
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    />
  );
};

export default function HomePage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt="4rem">
      <MatrixRain />
      <Box position="relative" w="100%" zIndex={1}>
        {/* bg-1.png absolutely positioned above hero, but above stars */}
        <Container
          as="section"
          maxW="1000px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          textAlign="center"
          gap="1rem"
          px={4}
        >
          <Box mb="0.5rem">
            <Image
              src="/morpheus_sigil_design.png"
              alt="Morpheus Logo"
              width={250}
              height={250}
            />
          </Box>
          <Heading
            as="h1"
            fontSize="3.5rem"
            fontWeight="normal"
            letterSpacing="0.02em"
          >
            Join Layer <Box 
              as="span" 
              className="asia-text"
              position="relative"
              display="inline-block"
              color="white"
              textDecoration="underline"
              textDecorationColor="white"
              textDecorationThickness="2px"
              textUnderlineOffset="2px"
            >Asia</Box> Of <Box as="span" fontWeight="bold">Morpheus</Box>
          </Heading>
          <Text
            fontSize="1.5rem"
            maxW="800px"
            lineHeight="1.6"
          >
            Morpheus Asia is a community of the best Smart Agent, DeAI, Personal AI minds in Asia
          </Text>
        </Container>

        {/* Exclamation section */}
        <Grid
          as="section"
          templateColumns="1fr 1fr 1fr"
          gap="2rem"
          alignItems="center"
          my="4rem"
          maxW="1200px"
          mx="auto"
          px="2rem"
        >
          <VStack gap="2rem" justify="center" align="center">
            <Image
              src="/1-capital.png"
              alt="Capital"
              width={300}
              height={200}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Image
              src="/3-compute.png"
              alt="Computer"
              width={300}
              height={200}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </VStack>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src="/exclamation-nobg.png"
              alt="Exclamation"
              width={200}
              height={400}
              style={{
                width: "auto",
                height: "400px",
                maxHeight: "400px",
              }}
            />
          </Box>
          <VStack gap="2rem" justify="center" align="center">
            <Image
              src="/2-coders.png"
              alt="Coders"
              width={300}
              height={200}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Image
              src="/4-builders.png"
              alt="Builders"
              width={300}
              height={200}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </VStack>
        </Grid>

        {/* What is Morpheus section */}
        <Container
          as="section"
          maxW="1300px"
          my="5rem"
          px="2rem"
          textAlign="center"
        >
          <Heading
            as="h2"
            fontSize="3rem"
            fontWeight="bold"
            mb="2.5rem"
          >
            What is Morpheus?
          </Heading>
          <Text
            fontSize="1.5rem"
            lineHeight="1.9"
            maxW="1000px"
            mx="auto"
          >
            Morpheus is a decentralized AI network that empowers developers and users to build, deploy, and interact with intelligent agents. It combines the power of blockchain technology with artificial intelligence to create a new paradigm for Smart Agents and Personal AI.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
