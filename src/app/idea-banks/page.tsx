'use client';

import { Box, Container, Heading, Text, VStack, Spinner, Image, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface IdeaBank {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  Summary?: string;
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

interface IdeaBanksResponse {
  data: IdeaBank[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function IdeaBanksPage() {
  const [ideaBanks, setIdeaBanks] = useState<IdeaBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIdeaBanks() {
      try {
        setLoading(true);
        const response = await fetch('/api/idea-banks');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch idea banks');
        }
        
        const data: IdeaBanksResponse = await response.json();
        console.log('Fetched idea banks:', data);
        setIdeaBanks(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching idea banks:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load idea banks. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeaBanks();
  }, []);

  // Get image URL
  const getImageUrl = (image: IdeaBank['Image']) => {
    if (!image?.url) return null;
    return image.url.startsWith('http') 
      ? image.url 
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${image.url}`;
  };

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1400px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="4rem" align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", sm: "3rem", md: "4rem" }}
              fontWeight="bold"
              mb="1rem"
              letterSpacing="0.02em"
              color="white"
            >
              Idea Bank
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              color="rgba(255, 255, 255, 0.7)"
              maxW="600px"
              mx="auto"
            >
              Explore innovative ideas and projects from the Morpheus community
            </Text>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box textAlign="center" py="4rem">
              <Spinner size="xl" color="#1fdc8f" />
              <Text mt="1rem" fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
                Loading idea banks...
              </Text>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box
              textAlign="center"
              py="4rem"
              bg="rgba(255, 0, 0, 0.1)"
              border="1px solid rgba(255, 0, 0, 0.3)"
              borderRadius="8px"
            >
              <Text fontSize="1.25rem" color="rgba(255, 255, 255, 0.9)">
                {error}
              </Text>
            </Box>
          )}

          {/* Idea Banks Grid */}
          {!loading && !error && ideaBanks.length > 0 && (
            <Grid
              templateColumns={{ 
                base: "1fr", 
                md: "repeat(2, 1fr)", 
                lg: "repeat(3, 1fr)" 
              }}
              gap={{ base: "1.5rem", md: "2rem" }}
            >
              {ideaBanks.map((ideaBank) => {
                const imageUrl = getImageUrl(ideaBank.Image);
                
                return (
                  <Link key={ideaBank.id} href={`/idea-bank/${ideaBank.slug}`}>
                    <Box
                      bg="rgba(255, 255, 255, 0.03)"
                      border="2px solid rgba(255, 255, 255, 0.2)"
                      overflow="hidden"
                      transition="all 0.3s"
                      cursor="pointer"
                      h="100%"
                      _hover={{
                        bg: "rgba(31, 220, 143, 0.08)",
                        borderColor: "#1fdc8f",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(31, 220, 143, 0.3)",
                      }}
                    >
                      {/* Image */}
                      {imageUrl && (
                        <Box
                          w="100%"
                          h="200px"
                          overflow="hidden"
                          bg="rgba(9, 13, 14, 0.3)"
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
                      
                      {/* Content */}
                      <VStack gap="0.75rem" align="stretch" p={{ base: "1.25rem", md: "1.5rem" }}>
                        {/* Category Tag */}
                        {ideaBank.Category && (
                          <Box
                            bg="rgba(31, 220, 143, 0.2)"
                            px="0.75rem"
                            py="0.25rem"
                            fontSize="0.75rem"
                            fontWeight="bold"
                            textTransform="uppercase"
                            color="#1fdc8f"
                            w="fit-content"
                          >
                            {ideaBank.Category}
                          </Box>
                        )}
                        
                        {/* Title */}
                        <Heading
                          as="h3"
                          fontSize={{ base: "1.125rem", md: "1.25rem" }}
                          fontWeight="bold"
                          color="white"
                          lineHeight="1.3"
                        >
                          {ideaBank.Title || 'Untitled'}
                        </Heading>
                        
                        {/* Summary */}
                        {ideaBank.Summary && (
                          <Text
                            fontSize={{ base: "0.875rem", md: "1rem" }}
                            color="rgba(255, 255, 255, 0.7)"
                            lineHeight="1.6"
                            css={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {ideaBank.Summary}
                          </Text>
                        )}
                        
                        {/* Read More */}
                        <Text
                          color="#1fdc8f"
                          fontSize={{ base: "0.875rem", md: "1rem" }}
                          fontWeight="bold"
                          mt="auto"
                        >
                          Learn More →
                        </Text>
                      </VStack>
                    </Box>
                  </Link>
                );
              })}
            </Grid>
          )}

          {/* No Idea Banks State */}
          {!loading && !error && ideaBanks.length === 0 && (
            <Box textAlign="center" py="4rem">
              <Text fontSize="1.5rem" color="rgba(255, 255, 255, 0.7)">
                No ideas available at the moment. Check back soon!
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
