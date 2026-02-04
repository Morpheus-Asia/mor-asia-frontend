'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface IdeaBank {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  Summary?: string;
  Content?: string;
  Image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  Category?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface IdeaBankResponse {
  data: IdeaBank;
}

export default function IdeaBankPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [ideaBank, setIdeaBank] = useState<IdeaBank | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIdeaBank() {
      try {
        setLoading(true);
        const response = await fetch(`/api/idea-banks/${slug}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch idea bank');
        }
        
        const data: IdeaBankResponse = await response.json();
        console.log('Fetched idea bank:', data);
        setIdeaBank(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching idea bank:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load idea bank. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchIdeaBank();
    }
  }, [slug]);

  // Get image URL
  const getImageUrl = (image: IdeaBank['Image']) => {
    if (!image?.url) return null;
    return image.url.startsWith('http') 
      ? image.url 
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${image.url}`;
  };

  const imageUrl = ideaBank ? getImageUrl(ideaBank.Image) : null;

  if (loading) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
          <Box textAlign="center" py="4rem">
            <Spinner size="xl" color="#1fdc8f" />
            <Text mt="1rem" fontSize={{ base: "1rem", md: "1.25rem" }} color="rgba(255, 255, 255, 0.7)">
              Loading idea...
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !ideaBank) {
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
                {error || 'Idea not found'}
              </Heading>
              <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="rgba(255, 255, 255, 0.8)" mb="2rem">
                The idea you&apos;re looking for doesn&apos;t exist or has been removed.
              </Text>
              <Link href="/idea-banks">
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
                  Back to Idea Bank
                </Box>
              </Link>
            </Box>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1000px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap={{ base: "2rem", md: "3rem" }} align="stretch">
          {/* Back Button */}
          <Link href="/idea-banks">
            <Text
              color="#1fdc8f"
              fontSize={{ base: "0.875rem", md: "1rem" }}
              fontWeight="bold"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              ← Back to Idea Bank
            </Text>
          </Link>

          {/* Header */}
          <Box>
            {/* Category Tag */}
            <HStack gap="1rem" mb="1rem" flexWrap="wrap">
              {ideaBank.Category && (
                <Box
                  bg="rgba(31, 220, 143, 0.2)"
                  px="1rem"
                  py="0.5rem"
                  fontSize="0.875rem"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="#1fdc8f"
                >
                  {ideaBank.Category}
                </Box>
              )}
              <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="rgba(255, 255, 255, 0.5)">
                {new Date(ideaBank.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </HStack>

            {/* Title */}
            <Heading
              as="h1"
              fontSize={{ base: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" }}
              fontWeight="bold"
              lineHeight="1.2"
              color="white"
              mb="1.5rem"
            >
              {ideaBank.Title}
            </Heading>

            {/* Summary */}
            {ideaBank.Summary && (
              <Text
                fontSize={{ base: "1.125rem", md: "1.25rem" }}
                color="rgba(255, 255, 255, 0.8)"
                lineHeight="1.6"
              >
                {ideaBank.Summary}
              </Text>
            )}
          </Box>

          {/* Featured Image */}
          {imageUrl && (
            <Box
              w="100%"
              maxH="500px"
              overflow="hidden"
              borderRadius="8px"
              border="2px solid rgba(255, 255, 255, 0.1)"
            >
              <Image
                src={imageUrl}
                alt={ideaBank.Image?.alternativeText || ideaBank.Title || 'Idea Bank image'}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
          )}

          {/* Content (Markdown) */}
          {ideaBank.Content && (
            <Box
              className="idea-bank-content"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              lineHeight="1.8"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              css={{
                '& > :first-of-type': {
                  marginTop: '0',
                },
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
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {ideaBank.Content}
              </ReactMarkdown>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
