'use client';

import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react";
import Image from "next/image";

export default function LearnPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="3rem" align="stretch">
          {/* Header Section */}
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", sm: "3rem", md: "3.5rem" }}
              fontWeight="bold"
              mb="1rem"
              letterSpacing="0.02em"
            >
              Learn
            </Heading>
            <Box 
              h="4px" 
              w="80px" 
              bg="#1fdc8f" 
              mb="2rem"
            />
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              color="white"
              lineHeight="1.8"
              mb="2rem"
            >
              Welcome to the Morpheus documentation hub. Here you&apos;ll find comprehensive resources 
              to help you understand, integrate, and build with the Morpheus ecosystem. Whether you&apos;re 
              a developer, researcher, or enthusiast, these documentation sources will guide you through 
              the decentralized AI network.
            </Text>
          </Box>

          {/* Documentation Sections */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1rem"
              color="white"
            >
              Morpheus Gitbook Documentation
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="white"
              lineHeight="1.8"
              mb="1rem"
            >
              The primary documentation resource for understanding the Morpheus network. This comprehensive 
              guide covers the foundational concepts, architecture, tokenomics, and implementation details 
              of the Morpheus ecosystem. Perfect for getting started and diving deep into how Morpheus works.
            </Text>
            <Link
              href="https://gitbook.mor.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="#1fdc8f"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              Visit Documentation →
            </Link>
          </Box>

          <Box 
            h="1px" 
            bg="rgba(255, 255, 255, 0.1)" 
            my="1rem"
          />

          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1rem"
              color="white"
            >
              Morpheus API Documentation
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="white"
              lineHeight="1.8"
              mb="1rem"
            >
              Technical API reference for developers building applications and integrations with Morpheus. 
              Includes detailed endpoint documentation, authentication methods, request/response formats, 
              and code examples. Essential for anyone looking to programmatically interact with the 
              Morpheus network.
            </Text>
            <Link
              href="https://apidocs.mor.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="#1fdc8f"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              View API Reference →
            </Link>
          </Box>

          <Box 
            h="1px" 
            bg="rgba(255, 255, 255, 0.1)" 
            my="1rem"
          />

          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1rem"
              color="white"
            >
              Lumerin Compute Infrastructure
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="white"
              lineHeight="1.8"
              mb="1rem"
            >
              Documentation for the Lumerin compute layer that powers Morpheus&apos;s decentralized AI 
              capabilities. Learn about compute provider setup, resource management, and how the 
              distributed infrastructure enables AI model execution. Critical reading for compute 
              providers and infrastructure contributors.
            </Text>
            <Link
              href="https://gitbook.mor.lumerin.io/"
              target="_blank"
              rel="noopener noreferrer"
              color="#1fdc8f"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              Read Infrastructure Docs →
            </Link>
          </Box>

          <Box 
            h="1px" 
            bg="rgba(255, 255, 255, 0.1)" 
            my="1rem"
          />

          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1rem"
              color="white"
            >
              Morpheus Asia YouTube Channel
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="white"
              lineHeight="1.8"
              mb="1rem"
            >
              Watch in-depth video guides, tutorials, and community updates from Morpheus Asia. 
              Our YouTube channel features step-by-step walkthroughs, ecosystem updates, and 
              interviews with key contributors. Perfect for visual learners who want to see 
              Morpheus in action.
            </Text>
            <Link
              href="https://www.youtube.com/@MorpheusAsia"
              target="_blank"
              rel="noopener noreferrer"
              color="#1fdc8f"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              Watch Videos →
            </Link>
          </Box>

          <Box 
            h="1px" 
            bg="rgba(255, 255, 255, 0.1)" 
            my="1rem"
          />

          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1rem"
              color="white"
            >
              Brainpower Podcast
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="white"
              lineHeight="1.8"
              mb="1rem"
            >
              Dive deeper into the world of decentralized AI with the Brainpower Podcast. 
              Featuring conversations with industry leaders, technical deep dives, and 
              discussions about the future of AI and blockchain. Get insights from the minds 
              shaping the decentralized AI landscape.
            </Text>
            <Link
              href="https://www.youtube.com/@brainpower_podcast"
              target="_blank"
              rel="noopener noreferrer"
              color="#1fdc8f"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              Listen to Podcast →
            </Link>
          </Box>

          {/* Footer Note */}
          <Box 
            mt="2rem"
            p={{ base: "1rem", md: "1.5rem" }}
            bg="rgba(31, 220, 143, 0.05)"
            border="1px solid rgba(31, 220, 143, 0.2)"
            borderRadius="8px"
          >
            <Text
              fontSize={{ base: "0.875rem", md: "1rem" }}
              color="white"
              lineHeight="1.7"
            >
              <strong style={{ color: '#1fdc8f' }}>Note:</strong> All documentation is actively 
              maintained and updated. If you encounter any issues or have questions, please reach 
              out to our community on{' '}
              <Link
                href="https://discord.gg/morpheus"
                target="_blank"
                rel="noopener noreferrer"
                color="#1fdc8f"
                fontWeight="600"
                _hover={{ textDecoration: 'underline' }}
              >
                Discord
              </Link>
              {' '}or{' '}
              <Link
                href="https://t.me/MorpheusAsia"
                target="_blank"
                rel="noopener noreferrer"
                color="#1fdc8f"
                fontWeight="600"
                _hover={{ textDecoration: 'underline' }}
              >
                Telegram
              </Link>
              .
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
