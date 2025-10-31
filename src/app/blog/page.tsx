'use client';

import { Box, Container, Heading, Text, VStack, Grid, Link, HStack } from "@chakra-ui/react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  link?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introducing Morpheus Asia: Building the Future of Decentralized AI',
    excerpt: 'Today marks a significant milestone as we officially launch Morpheus Asia, bringing the power of decentralized AI to the Asian community. Learn about our vision and what we have planned.',
    date: 'October 1, 2025',
    author: 'Morpheus Asia Team',
    category: 'Announcement',
    readTime: '5 min read',
    link: '#',
  },
  {
    id: '2',
    title: 'Understanding the Four Pillars of Morpheus',
    excerpt: 'Dive deep into how Capital, Code, Compute, and Community work together to create a sustainable and decentralized AI ecosystem. Each pillar plays a crucial role in the network.',
    date: 'October 15, 2025',
    author: 'Alex Chen',
    category: 'Education',
    readTime: '8 min read',
    link: '#',
  },
  {
    id: '3',
    title: 'Smart Agents: The Next Evolution of AI',
    excerpt: 'Explore how Smart Agents combine the intelligence of AI with the trustless execution of blockchain technology to create autonomous, intelligent systems that work for you.',
    date: 'October 20, 2025',
    author: 'Sarah Kim',
    category: 'Technology',
    readTime: '6 min read',
    link: '#',
  },
  {
    id: '4',
    title: 'How to Get Started with MOR Token Staking',
    excerpt: 'A comprehensive guide for capital providers looking to stake stETH and earn MOR tokens. Learn about the process, rewards, and best practices for maximizing your returns.',
    date: 'October 25, 2025',
    author: 'David Zhang',
    category: 'Tutorial',
    readTime: '10 min read',
    link: '#',
  },
  {
    id: '5',
    title: 'The State of AI in Asia: Opportunities and Challenges',
    excerpt: 'An analysis of the current AI landscape in Asia, exploring the unique opportunities for decentralized AI adoption and the challenges we need to overcome together.',
    date: 'October 28, 2025',
    author: 'Maria Tanaka',
    category: 'Analysis',
    readTime: '12 min read',
    link: '#',
  },
  {
    id: '6',
    title: 'Building Your First Smart Agent: A Developer&apos;s Guide',
    excerpt: 'Step-by-step tutorial on creating and deploying your first smart agent on the Morpheus network. Includes code examples and best practices for developers.',
    date: 'October 30, 2025',
    author: 'Dev Team',
    category: 'Tutorial',
    readTime: '15 min read',
    link: '#',
  },
];

const categories = ['All', 'Announcement', 'Education', 'Technology', 'Tutorial', 'Analysis'];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link
      href={post.link || '#'}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.03)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        p="2rem"
        h="100%"
        transition="all 0.3s"
        _hover={{
          bg: "rgba(31, 220, 143, 0.05)",
          borderColor: "#1fdc8f",
          transform: "translateY(-4px)",
        }}
      >
        <VStack align="stretch" gap="1rem" h="100%">
          <HStack justify="space-between" flexWrap="wrap" gap="0.5rem">
            <Box
              bg="rgba(31, 220, 143, 0.2)"
              px="0.75rem"
              py="0.25rem"
              fontSize="0.75rem"
              fontWeight="bold"
              textTransform="uppercase"
              color="#1fdc8f"
            >
              {post.category}
            </Box>
            <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)">
              {post.readTime}
            </Text>
          </HStack>

          <Heading
            as="h3"
            fontSize="1.75rem"
            fontWeight="bold"
            color="white"
            lineHeight="1.3"
          >
            {post.title}
          </Heading>

          <Text
            fontSize="1.125rem"
            lineHeight="1.7"
            color="rgba(255, 255, 255, 0.7)"
            flex="1"
          >
            {post.excerpt}
          </Text>

          <HStack
            pt="1rem"
            borderTop="1px solid rgba(255, 255, 255, 0.1)"
            justify="space-between"
            flexWrap="wrap"
            gap="0.5rem"
          >
            <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.6)">
              By {post.author}
            </Text>
            <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)">
              {post.date}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default function BlogPage() {
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
              Blog
            </Heading>
            <Text
              fontSize="1.5rem"
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              Insights, tutorials, and updates from the Morpheus Asia community. 
              Stay informed about the latest developments in decentralized AI.
            </Text>
          </Box>

          {/* Category Filter (Optional - can be made functional later) */}
          <Box>
            <HStack
              gap="1rem"
              justify="center"
              flexWrap="wrap"
              pb="2rem"
              borderBottom="1px solid rgba(255, 255, 255, 0.1)"
            >
              {categories.map((category, index) => (
                <Box
                  key={index}
                  as="button"
                  px="1.5rem"
                  py="0.5rem"
                  fontSize="1rem"
                  fontWeight="bold"
                  color={index === 0 ? "black" : "white"}
                  bg={index === 0 ? "#1fdc8f" : "transparent"}
                  border="1px solid"
                  borderColor={index === 0 ? "#1fdc8f" : "rgba(255, 255, 255, 0.3)"}
                  transition="all 0.2s"
                  _hover={{
                    bg: index === 0 ? "#18c57d" : "rgba(31, 220, 143, 0.1)",
                    borderColor: "#1fdc8f",
                  }}
                >
                  {category}
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Blog Posts Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap="2rem"
          >
            {blogPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </Grid>

          {/* Newsletter Subscription */}
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
              Stay Updated
            </Heading>
            <Text
              fontSize="1.25rem"
              mb="2rem"
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.7"
              maxW="700px"
              mx="auto"
            >
              Join our community channels to never miss an update. Get the latest articles, 
              announcements, and insights delivered directly to you.
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
              <Link href="https://twitter.com/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
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
                  Follow on X
                </Box>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
