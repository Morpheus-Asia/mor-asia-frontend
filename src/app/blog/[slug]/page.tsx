'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";

interface Author {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Tag {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  author: Author;
  featured_image: any;
  tags: Tag[];
  localizations: any[];
}

interface BlogPostResponse {
  data: BlogPost;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog-posts/${slug}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch blog post');
        }
        
        const data: BlogPostResponse = await response.json();
        console.log('Fetched blog post:', data);
        setPost(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load blog post. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
          <Box textAlign="center" py="4rem">
            <Spinner size="xl" color="#1fdc8f" />
            <Text mt="1rem" fontSize={{ base: "1rem", md: "1.25rem" }} color="rgba(255, 255, 255, 0.7)">
              Loading blog post...
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
          <VStack gap="2rem" align="center" py="4rem">
            <Box
              textAlign="center"
              bg="rgba(255, 0, 0, 0.1)"
              border="1px solid rgba(255, 0, 0, 0.3)"
              borderRadius="8px"
              p={{ base: "1.5rem", md: "2rem" }}
            >
              <Heading as="h2" fontSize={{ base: "1.5rem", md: "2rem" }} mb="1rem" color="white">
                {error || 'Blog post not found'}
              </Heading>
              <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="rgba(255, 255, 255, 0.8)" mb="2rem">
                The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
              </Text>
              <Link href="/blogs/1">
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "0.875rem", md: "1rem" }}
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Back to Blog
                </Box>
              </Link>
            </Box>
          </VStack>
        </Container>
      </Box>
    );
  }  const { title, date, content, tags, author } = post;
  
  // Calculate read time
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack align="stretch">
          {/* Back Button */}
          <Link href="/blogs/1">
            <Text
              color="#1fdc8f"
              fontSize={{ base: "0.875rem", md: "1rem" }}
              fontWeight="bold"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              ← Back to Blog
            </Text>
          </Link>

          {/* Article Header */}
          <Box>
            {/* Tags */}
            {tags && tags.length > 0 && (
              <HStack gap="0.75rem" mb="1.5rem" flexWrap="wrap">
                {tags.map(tag => (
                  <Box
                    key={tag.id}
                    bg="rgba(31, 220, 143, 0.2)"
                    px="0.75rem"
                    py="0.25rem"
                    fontSize="0.75rem"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="#1fdc8f"
                  >
                    {tag.name}
                  </Box>
                ))}
              </HStack>
            )}

            {/* Title */}
            <Heading
              as="h1"
              fontSize={{ base: "1.75rem", sm: "2.25rem", md: "3rem", lg: "3.5rem" }}
              fontWeight="bold"
              mb="1rem"
              lineHeight="1.2"
              color="white"
            >
              {title}
            </Heading>

            {/* Meta Info */}
            <HStack
              gap={{ base: "1rem", md: "1.5rem" }}
              pb="1rem"
              borderBottom="2px solid rgba(255, 255, 255, 0.1)"
              flexWrap="wrap"
              fontSize={{ base: "0.875rem", md: "1rem" }}
            >
              <HStack gap="0.5rem">
                <Text color="rgba(255, 255, 255, 0.6)">
                  By
                </Text>
                <Text fontWeight="bold" color="white">
                  {author?.name || 'Anonymous'}
                </Text>
              </HStack>
              <Text color="rgba(255, 255, 255, 0.5)">
                {formattedDate}
              </Text>
              <Text color="rgba(255, 255, 255, 0.5)">
                {readTime} min read
              </Text>
            </HStack>
          </Box>

          {/* Article Content */}
          <Box
            className="blog-content"
            fontSize={{ base: "1rem", md: "1.125rem" }}
            lineHeight="1.8"
            color="white"
            fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            css={{
              '& h1': {
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '3rem',
                marginBottom: '1.5rem',
                lineHeight: '1.3',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& h2': {
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '2.5rem',
                marginBottom: '1.25rem',
                lineHeight: '1.3',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& h3': {
                fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '2rem',
                marginBottom: '1rem',
                lineHeight: '1.4',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& h4': {
                fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '1.5rem',
                marginBottom: '0.75rem',
                lineHeight: '1.4',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& p': {
                marginBottom: '1.5rem',
                color: 'white',
                lineHeight: '1.8',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& a': {
                color: '#1fdc8f',
                textDecoration: 'underline',
              },
              '& a:hover': {
                color: '#18c57d',
              },
              '& ul': {
                marginLeft: 'clamp(1rem, 5vw, 2rem)',
                marginBottom: '1.5rem',
                marginTop: '1rem',
                listStyleType: 'disc',
                paddingLeft: '0.5rem',
              },
              '& ol': {
                marginLeft: 'clamp(1rem, 5vw, 2rem)',
                marginBottom: '1.5rem',
                marginTop: '1rem',
                listStyleType: 'decimal',
                paddingLeft: '0.5rem',
              },
              '& li': {
                marginBottom: '0.75rem',
                color: 'white',
                lineHeight: '1.7',
                paddingLeft: '0.5rem',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& li::marker': {
                color: '#1fdc8f',
              },
              '& li > p': {
                marginBottom: '0.5rem',
                display: 'inline',
              },
              '& ul ul, & ol ol, & ul ol, & ol ul': {
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              },
              '& hr': {
                border: 'none',
                borderTop: '2px solid rgba(255, 255, 255, 0.1)',
                marginTop: '2rem',
                marginBottom: '2rem',
              },
              '& strong': {
                fontWeight: 'bold',
                color: 'white',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& em': {
                fontStyle: 'italic',
                color: 'white',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& code': {
                background: 'rgba(31, 220, 143, 0.1)',
                color: '#1fdc8f',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'monospace',
              },
              '& pre': {
                background: 'rgba(9, 13, 14, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                borderRadius: '8px',
                overflow: 'auto',
                marginBottom: '1.5rem',
                marginTop: '1rem',
              },
              '& pre code': {
                background: 'transparent',
                padding: 0,
                color: 'white',
                fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
              },
              '& blockquote': {
                borderLeft: '4px solid #1fdc8f',
                paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                color: 'white',
                fontStyle: 'italic',
                background: 'rgba(31, 220, 143, 0.05)',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& blockquote p': {
                marginBottom: '0.5rem',
              },
              '& img': {
                maxWidth: 'min(100%, 600px)',
                height: 'auto',
                borderRadius: '8px',
                marginTop: '2rem',
                marginBottom: '2rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              },
              '& table': {
                width: '100%',
                marginBottom: '1.5rem',
                marginTop: '1rem',
                borderCollapse: 'collapse',
                display: 'block',
                overflowX: 'auto',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& th, & td': {
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                textAlign: 'left',
                color: 'white',
              },
              '& th': {
                background: 'rgba(31, 220, 143, 0.1)',
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          >
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <ChakraLink href={href} target="_blank" rel="noopener noreferrer" color="#1fdc8f">
                    {children}
                  </ChakraLink>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>

          {/* Article Footer */}
          <Box
            pt="3rem"
            borderTop="2px solid rgba(255, 255, 255, 0.1)"
          >
            <HStack justify="space-between" flexWrap="wrap" gap="1rem">
              <Link href="/blogs/1">
                <Text
                  color="#1fdc8f"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  _hover={{ textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  ← Back to Blog
                </Text>
              </Link>
              
              {/* Share buttons could go here */}
            </HStack>
          </Box>

          {/* CTA Section */}
          <Box
            bg="rgba(31, 220, 143, 0.1)"
            border="2px solid #1fdc8f"
            p={{ base: "1.5rem", md: "3rem" }}
            textAlign="center"
            mt="2rem"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1.5rem"
            >
              Join the Community
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              mb="2rem"
              color="white"
              lineHeight="1.7"
              maxW="700px"
              mx="auto"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              Connect with fellow developers and AI enthusiasts. 
              Share your thoughts and stay updated with the latest from Morpheus Asia.
            </Text>
            <HStack gap={{ base: "0.75rem", md: "1rem" }} justify="center" flexWrap="wrap">
              <ChakraLink href="https://t.me/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
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
              </ChakraLink>
              <ChakraLink href="https://twitter.com/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
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
              </ChakraLink>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
