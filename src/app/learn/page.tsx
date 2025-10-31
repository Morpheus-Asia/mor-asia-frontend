'use client';

import { Box, Container, Heading, Text, VStack, Grid, Link, HStack } from "@chakra-ui/react";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  type: 'article' | 'video' | 'documentation' | 'tutorial';
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const topics: Topic[] = [
  {
    id: '1',
    title: 'Smart Agents',
    description: 'Learn how to build and deploy intelligent agents that can interact with blockchain networks and perform autonomous tasks.',
    icon: '🤖',
  },
  {
    id: '2',
    title: 'Decentralized AI',
    description: 'Understand the principles of decentralized artificial intelligence and how Morpheus creates a permissionless AI network.',
    icon: '🧠',
  },
  {
    id: '3',
    title: 'MOR Token Economics',
    description: 'Explore the tokenomics behind MOR, including staking, rewards, and the four pillars of contribution.',
    icon: '💎',
  },
  {
    id: '4',
    title: 'Developer Tools',
    description: 'Get started with the Morpheus SDK, APIs, and development frameworks to build your first AI agent.',
    icon: '🛠️',
  },
];

const resources: Resource[] = [
  {
    id: '1',
    title: 'Morpheus Whitepaper',
    description: 'The foundational document explaining the vision, architecture, and tokenomics of the Morpheus network.',
    category: 'Documentation',
    link: 'https://mor.org/whitepaper',
    type: 'documentation',
  },
  {
    id: '2',
    title: 'Getting Started with Smart Agents',
    description: 'A comprehensive guide to building your first smart agent on the Morpheus network.',
    category: 'Tutorial',
    link: '#',
    type: 'tutorial',
  },
  {
    id: '3',
    title: 'Understanding Capital Provision',
    description: 'Learn how to become a capital provider by staking stETH and earning MOR tokens.',
    category: 'Guide',
    link: '#',
    type: 'article',
  },
  {
    id: '4',
    title: 'Compute Provider Setup',
    description: 'Step-by-step instructions for setting up your infrastructure to provide compute power.',
    category: 'Tutorial',
    link: '#',
    type: 'tutorial',
  },
  {
    id: '5',
    title: 'Introduction to Morpheus',
    description: 'Watch this video introduction to understand the basics of the Morpheus ecosystem.',
    category: 'Video',
    link: '#',
    type: 'video',
  },
  {
    id: '6',
    title: 'API Documentation',
    description: 'Complete API reference for integrating with Morpheus smart contracts and services.',
    category: 'Documentation',
    link: '#',
    type: 'documentation',
  },
];

const TopicCard = ({ topic }: { topic: Topic }) => {
  return (
    <Box
      bg="rgba(31, 220, 143, 0.05)"
      border="1px solid #1fdc8f"
      p="2rem"
      transition="all 0.3s"
      _hover={{
        bg: "rgba(31, 220, 143, 0.1)",
        transform: "translateY(-4px)",
        borderColor: "#1fdc8f",
      }}
      h="100%"
    >
      <VStack align="stretch" gap="1rem" h="100%">
        <Text fontSize="3rem">{topic.icon}</Text>
        <Heading
          as="h3"
          fontSize="1.75rem"
          fontWeight="bold"
          color="white"
        >
          {topic.title}
        </Heading>
        <Text
          fontSize="1.125rem"
          lineHeight="1.7"
          color="rgba(255, 255, 255, 0.8)"
          flex="1"
        >
          {topic.description}
        </Text>
      </VStack>
    </Box>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const typeIcons = {
    article: '📄',
    video: '🎥',
    documentation: '📚',
    tutorial: '🎓',
  };

  return (
    <Link
      href={resource.link}
      target={resource.link.startsWith('http') ? '_blank' : '_self'}
      rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.03)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        p="1.75rem"
        transition="all 0.3s"
        _hover={{
          bg: "rgba(31, 220, 143, 0.05)",
          borderColor: "#1fdc8f",
          transform: "translateX(8px)",
        }}
        h="100%"
      >
        <VStack align="stretch" gap="0.75rem">
          <HStack justify="space-between" align="flex-start">
            <Text fontSize="1.5rem">{typeIcons[resource.type]}</Text>
            <Box
              bg="rgba(31, 220, 143, 0.2)"
              px="0.75rem"
              py="0.25rem"
              fontSize="0.75rem"
              fontWeight="bold"
              textTransform="uppercase"
              color="#1fdc8f"
            >
              {resource.category}
            </Box>
          </HStack>
          <Heading
            as="h3"
            fontSize="1.35rem"
            fontWeight="bold"
            color="white"
          >
            {resource.title}
          </Heading>
          <Text
            fontSize="1rem"
            lineHeight="1.6"
            color="rgba(255, 255, 255, 0.7)"
          >
            {resource.description}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default function LearnPage() {
  return (
    <Box as="main" position="relative" minH="100vh" pt="8rem" pb="4rem">
      <Container maxW="1200px" px="2rem">
        <VStack gap="4rem" align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize="4rem"
              fontWeight="bold"
              mb="1.5rem"
              letterSpacing="0.02em"
            >
              Learn
            </Heading>
            <Text
              fontSize="1.5rem"
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              Explore comprehensive resources to understand Morpheus, build with our technology, 
              and contribute to the decentralized AI revolution.
            </Text>
          </Box>

          {/* Key Topics */}
          <VStack align="stretch" gap="2rem">
            <Heading
              as="h2"
              fontSize="2.5rem"
              fontWeight="bold"
              color="#1fdc8f"
            >
              Key Topics
            </Heading>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap="2rem"
            >
              {topics.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </Grid>
          </VStack>

          {/* Learning Resources */}
          <VStack align="stretch" gap="2rem">
            <Heading
              as="h2"
              fontSize="2.5rem"
              fontWeight="bold"
              color="#1fdc8f"
            >
              Learning Resources
            </Heading>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr" }}
              gap="1.5rem"
            >
              {resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </Grid>
          </VStack>

          {/* Getting Started Section */}
          <Box
            bg="rgba(31, 220, 143, 0.1)"
            border="2px solid #1fdc8f"
            p="3rem"
            textAlign="center"
            mt="2rem"
          >
            <Heading
              as="h2"
              fontSize="2rem"
              fontWeight="bold"
              mb="1.5rem"
            >
              Ready to Get Started?
            </Heading>
            <Text
              fontSize="1.25rem"
              mb="2rem"
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.7"
              maxW="700px"
              mx="auto"
            >
              Join our community to connect with other learners, ask questions, and stay updated 
              on the latest developments in the Morpheus ecosystem.
            </Text>
            <HStack gap="1rem" justify="center" flexWrap="wrap">
              <Link href="https://t.me/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize="1rem"
                  fontWeight="bold"
                  fontFamily="MOS"
                  px="2rem"
                  py="1.25rem"
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Join Telegram
                </Box>
              </Link>
              <Link href="https://discord.gg/morpheus" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize="1rem"
                  fontWeight="bold"
                  fontFamily="MOS"
                  px="2rem"
                  py="1.25rem"
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Join Discord
                </Box>
              </Link>
            </HStack>
          </Box>

          {/* Four Pillars Section */}
          <VStack align="stretch" gap="2rem" mt="2rem">
            <Heading
              as="h2"
              fontSize="2.5rem"
              fontWeight="bold"
              color="#1fdc8f"
              textAlign="center"
            >
              The Four Pillars of Morpheus
            </Heading>
            <Text
              fontSize="1.25rem"
              color="rgba(255, 255, 255, 0.8)"
              textAlign="center"
              maxW="900px"
              mx="auto"
              lineHeight="1.7"
            >
              Morpheus is built on four key contribution pillars. Each pillar plays a vital role 
              in the network&apos;s success and is rewarded with MOR tokens.
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap="2rem"
              mt="1rem"
            >
              <Box
                bg="rgba(31, 220, 143, 0.03)"
                border="1px solid rgba(31, 220, 143, 0.3)"
                p="2rem"
                textAlign="center"
              >
                <Text fontSize="3rem" mb="1rem">💰</Text>
                <Heading as="h3" fontSize="1.5rem" mb="1rem" color="#1fdc8f">Capital</Heading>
                <Text color="rgba(255, 255, 255, 0.8)" lineHeight="1.6">
                  Stake stETH to provide liquidity and earn MOR tokens while supporting the network.
                </Text>
              </Box>
              <Box
                bg="rgba(31, 220, 143, 0.03)"
                border="1px solid rgba(31, 220, 143, 0.3)"
                p="2rem"
                textAlign="center"
              >
                <Text fontSize="3rem" mb="1rem">💻</Text>
                <Heading as="h3" fontSize="1.5rem" mb="1rem" color="#1fdc8f">Code</Heading>
                <Text color="rgba(255, 255, 255, 0.8)" lineHeight="1.6">
                  Develop and maintain the Morpheus protocol, tools, and infrastructure.
                </Text>
              </Box>
              <Box
                bg="rgba(31, 220, 143, 0.03)"
                border="1px solid rgba(31, 220, 143, 0.3)"
                p="2rem"
                textAlign="center"
              >
                <Text fontSize="3rem" mb="1rem">⚡</Text>
                <Heading as="h3" fontSize="1.5rem" mb="1rem" color="#1fdc8f">Compute</Heading>
                <Text color="rgba(255, 255, 255, 0.8)" lineHeight="1.6">
                  Provide processing power to run AI models and smart agents on the network.
                </Text>
              </Box>
              <Box
                bg="rgba(31, 220, 143, 0.03)"
                border="1px solid rgba(31, 220, 143, 0.3)"
                p="2rem"
                textAlign="center"
              >
                <Text fontSize="3rem" mb="1rem">🏗️</Text>
                <Heading as="h3" fontSize="1.5rem" mb="1rem" color="#1fdc8f">Community</Heading>
                <Text color="rgba(255, 255, 255, 0.8)" lineHeight="1.6">
                  Build applications, create content, and grow the Morpheus ecosystem.
                </Text>
              </Box>
            </Grid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
