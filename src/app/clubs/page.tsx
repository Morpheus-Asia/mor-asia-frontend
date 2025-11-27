'use client';

import { Box, Container, Heading, Text, VStack, Spinner, Image, Link as ChakraLink, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Club {
  id: number;
  documentId: string;
  Name: string;
  Link?: string;
  Logo?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  Region: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ClubsResponse {
  data: Club[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClubs() {
      try {
        setLoading(true);
        const response = await fetch('/api/clubs');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch clubs');
        }
        
        const data: ClubsResponse = await response.json();
        console.log('Fetched clubs:', data);
        setClubs(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load clubs. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  // Get all unique Region enum values from clubs
  const regions = Array.from(new Set(clubs.map(club => club.Region).filter(Boolean))).sort();

  // Group clubs by Region
  const clubsByRegion = regions.reduce((acc, region) => {
    acc[region] = clubs.filter(club => club.Region === region);
    return acc;
  }, {} as Record<string, Club[]>);

  // Get logo URL
  const getLogoUrl = (logo: Club['Logo']) => {
    if (!logo?.url) return null;
    return logo.url.startsWith('http') 
      ? logo.url 
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${logo.url}`;
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
              mb="1.5rem"
              letterSpacing="0.02em"
              color="white"
            >
              Clubs
            </Heading>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box textAlign="center" py="4rem">
              <Spinner size="xl" color="#1fdc8f" />
              <Text mt="1rem" fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
                Loading clubs...
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

          {/* Regions List */}
          {!loading && !error && regions.length > 0 && (
            <VStack gap="3rem" align="stretch">
              {regions.map((region) => {
                const regionClubs = clubsByRegion[region];
                if (!regionClubs || regionClubs.length === 0) return null;

                return (
                  <Box key={region} textAlign="center">
                    <Heading
                      as="h2"
                      fontSize={{ base: "1.75rem", sm: "2.25rem", md: "2.5rem" }}
                      fontWeight="bold"
                      mb="2rem"
                      color="white"
                    >
                      {region}
                    </Heading>
                    <Grid
                      templateColumns={{ 
                        base: "1fr", 
                        md: "repeat(auto-fit, minmax(300px, 1fr))", 
                        lg: "repeat(auto-fit, minmax(300px, 1fr))" 
                      }}
                      gap={{ base: "1.5rem", md: "2rem" }}
                      justifyItems="center"
                      w="100%"
                      maxW="1400px"
                      mx="auto"
                    >
                      {regionClubs.map((club) => {
                        const logoUrl = getLogoUrl(club.Logo);
                        const clubContent = (
                          <Box
                            bg="rgba(255, 255, 255, 0.03)"
                            border="2px solid rgba(255, 255, 255, 0.2)"
                            p={{ base: "1.5rem", md: "2rem" }}
                            transition="all 0.3s"
                            cursor={club.Link ? "pointer" : "default"}
                            w="100%"
                            maxW="400px"
                            _hover={{
                              bg: "rgba(31, 220, 143, 0.08)",
                              borderColor: "#1fdc8f",
                              transform: "translateY(-4px)",
                              boxShadow: "0 8px 24px rgba(31, 220, 143, 0.3)",
                            }}
                          >
                            <VStack gap="1.5rem" align="center">
                              {logoUrl && (
                                <Box
                                  w="100%"
                                  h="200px"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  bg="rgba(0, 0, 0, 0.3)"
                                  borderRadius="8px"
                                  overflow="hidden"
                                >
                                  <Image
                                    src={logoUrl}
                                    alt={club.Logo?.alternativeText || club.Name || 'Club logo'}
                                    maxH="200px"
                                    objectFit="contain"
                                  />
                                </Box>
                              )}
                              <VStack gap="0.5rem" align="center">
                                <Heading
                                  as="h3"
                                  fontSize={{ base: "1.25rem", md: "1.5rem" }}
                                  fontWeight="bold"
                                  color="white"
                                  textAlign="center"
                                >
                                  {club.Name || 'N/A'}
                                </Heading>
                                {club.Link && (
                                  <Text
                                    color="#1fdc8f"
                                    fontSize={{ base: "0.875rem", md: "1rem" }}
                                    textAlign="center"
                                  >
                                    Visit Website →
                                  </Text>
                                )}
                              </VStack>
                            </VStack>
                          </Box>
                        );

                        return club.Link ? (
                          <ChakraLink
                            key={club.id}
                            href={club.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            _hover={{ textDecoration: 'none' }}
                          >
                            {clubContent}
                          </ChakraLink>
                        ) : (
                          <Box key={club.id}>
                            {clubContent}
                          </Box>
                        );
                      })}
                    </Grid>
                  </Box>
                );
              })}
            </VStack>
          )}

          {/* No Clubs State */}
          {!loading && !error && clubs.length === 0 && (
            <Box textAlign="center" py="4rem">
              <Text fontSize="1.5rem" color="rgba(255, 255, 255, 0.7)">
                No clubs available at the moment. Check back soon!
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

