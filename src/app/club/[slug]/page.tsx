'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Image, Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Club {
  id: number;
  documentId: string;
  Name: string;
  slug: string;
  Logo?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  Region: string;
  Desc?: string;
  University?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ClubResponse {
  data: Club;
}

export default function ClubPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClub() {
      try {
        setLoading(true);
        const response = await fetch(`/api/clubs/${slug}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch club');
        }
        
        const data: ClubResponse = await response.json();
        console.log('Fetched club:', data);
        setClub(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching club:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load club. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchClub();
    }
  }, [slug]);

  // Get logo URL
  const getLogoUrl = (logo: Club['Logo']) => {
    if (!logo?.url) return null;
    return logo.url.startsWith('http') 
      ? logo.url 
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${logo.url}`;
  };

  const logoUrl = club ? getLogoUrl(club.Logo) : null;

  if (loading) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
          <Box textAlign="center" py="4rem">
            <Spinner size="xl" color="#1fdc8f" />
            <Text mt="1rem" fontSize={{ base: "1rem", md: "1.25rem" }} color="rgba(255, 255, 255, 0.7)">
              Loading club...
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !club) {
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
                {error || 'Club not found'}
              </Heading>
              <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="rgba(255, 255, 255, 0.8)" mb="2rem">
                The club you&apos;re looking for doesn&apos;t exist or has been removed.
              </Text>
              <Link href="/clubs">
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
                  Back to Clubs
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
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap={{ base: "2rem", md: "3rem" }} align="stretch">
          {/* Back Button */}
          <Link href="/clubs">
            <Text
              color="#1fdc8f"
              fontSize={{ base: "0.875rem", md: "1rem" }}
              fontWeight="bold"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              ← Back to Clubs
            </Text>
          </Link>

          {/* Club Header with Logo */}
          <HStack
            gap={{ base: "1.5rem", md: "2rem" }}
            align="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            {/* Logo */}
            {logoUrl && (
              <Box
                w={{ base: "150px", md: "180px" }}
                h={{ base: "150px", md: "180px" }}
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="rgba(255, 255, 255, 0.03)"
                borderRadius="8px"
                border="2px solid rgba(255, 255, 255, 0.1)"
                overflow="hidden"
                p="1.5rem"
              >
                <Image
                  src={logoUrl}
                  alt={club.Logo?.alternativeText || club.Name || 'Club logo'}
                  maxW="100%"
                  maxH="100%"
                  objectFit="contain"
                />
              </Box>
            )}

            {/* Title Area */}
            <Box textAlign={{ base: "center", md: "left" }}>
              <HStack gap="1rem" mb="1rem" flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                <Box
                  bg="rgba(31, 220, 143, 0.2)"
                  px="1rem"
                  py="0.5rem"
                  fontSize="0.875rem"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="#1fdc8f"
                >
                  Club
                </Box>
                {club.Region && (
                  <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="rgba(255, 255, 255, 0.7)">
                    {club.Region}
                  </Text>
                )}
              </HStack>

              {/* Title */}
              <Heading
                as="h1"
                fontSize={{ base: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" }}
                fontWeight="bold"
                lineHeight="1.2"
                color="white"
              >
                {club.Name}
              </Heading>

              {/* University Link */}
              {club.University && (
                <ChakraLink
                  href={club.University}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="inline-block"
                  mt="0.75rem"
                  color="#1fdc8f"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  _hover={{ textDecoration: 'underline' }}
                >
                  {club.University}
                </ChakraLink>
              )}
            </Box>
          </HStack>

          {/* Description (Markdown) */}
          {club.Desc && (
            <Box
              className="club-content"
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
                {club.Desc}
              </ReactMarkdown>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

