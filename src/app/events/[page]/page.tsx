'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Image, Link as ChakraLink, Grid, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Event {
  id: number;
  documentId: string;
  Title: string;
  Date: string | null;
  Description: string;
  slug: string;
  Register_Link?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Cover?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
}

interface EventsResponse {
  data: Event[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const EventCard = ({ event }: { event: Event }) => {
  const router = useRouter();
  const { Title, Date: eventDate, Description, Cover, Register_Link, slug } = event;
  
  const handleCardClick = () => {
    router.push(`/event/${slug}`);
  };
  
  // Format date and time
  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString || dateString === 'null' || dateString === 'undefined') {
      return 'TBA';
    }
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'TBA';
      }
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return { date: formattedDate, time: formattedTime };
    } catch {
      return 'TBA';
    }
  };

  const dateTime = formatDateTime(eventDate);
  
  // Check if event is past (only if date is valid and not TBA)
  const isPast = dateTime !== 'TBA' && eventDate && new Date(eventDate) < new Date();

  // Truncate description for card display
  const MAX_DESCRIPTION_LENGTH = 150;
  const truncatedDescription = Description && Description.length > MAX_DESCRIPTION_LENGTH
    ? Description.substring(0, MAX_DESCRIPTION_LENGTH).trim() + '...'
    : Description;

  // Get cover image URL
  const imageUrl = Cover?.url 
    ? (Cover.url.startsWith('http') 
        ? Cover.url 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${Cover.url}`)
    : null;

  return (
    <Box
      onClick={handleCardClick}
      bg="rgba(255, 255, 255, 0.03)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      overflow="hidden"
      h="100%"
      transition="all 0.3s"
      opacity={isPast ? 0.7 : 1}
      cursor="pointer"
      textDecoration="none"
      _hover={{
        bg: "rgba(31, 220, 143, 0.05)",
        borderColor: "#1fdc8f",
        transform: "translateY(-4px)",
        textDecoration: "none",
      }}
    >
      {/* Cover Image */}
      {imageUrl && (
        <Box
          w="100%"
          h="250px"
          overflow="hidden"
          position="relative"
          bg="rgba(9, 13, 14, 0.3)"
        >
          <Image
            src={imageUrl}
            alt={Cover?.alternativeText || Title || 'Event cover'}
            w="100%"
            h="100%"
            objectFit="contain"
          />
        </Box>
      )}

      <Box p="2rem">
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
              Event
            </Box>
            <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)">
              {typeof dateTime === 'object' ? dateTime.date : dateTime === 'TBA' ? 'TBA' : dateTime}
            </Text>
          </HStack>

          <Heading
            as="h3"
            fontSize="1.75rem"
            fontWeight="bold"
            color="white"
            lineHeight="1.3"
          >
            {Title || 'N/A'}
          </Heading>

          <Text
            fontSize="1.125rem"
            lineHeight="1.7"
            color="rgba(255, 255, 255, 0.7)"
            flex="1"
            whiteSpace="pre-wrap"
          >
            {truncatedDescription || 'N/A'}
          </Text>

          <HStack
            pt="1rem"
            borderTop="1px solid rgba(255, 255, 255, 0.1)"
            justify="space-between"
            flexWrap="wrap"
            gap="0.5rem"
          >
            {typeof dateTime === 'object' && (
              <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.6)">
                🕐 {dateTime.time}
              </Text>
            )}
            {/* Register Button */}
            {Register_Link && Register_Link !== 'N/A' && (
              <Box onClick={(e) => e.stopPropagation()}>
                {isPast ? (
                  <Button
                    bg="rgba(255, 255, 255, 0.2)"
                    color="rgba(255, 255, 255, 0.5)"
                    fontSize="0.875rem"
                    fontWeight="bold"
                    fontFamily="MOS"
                    px="1rem"
                    py="0.5rem"
                    borderRadius="0"
                    textTransform="uppercase"
                    transition="all 0.2s"
                    cursor="not-allowed"
                    disabled
                    _disabled={{
                      opacity: 1,
                      cursor: "not-allowed",
                    }}
                  >
                    Register Now
                  </Button>
                ) : (
                  <ChakraLink href={Register_Link} target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                    <Button
                      bg="#1fdc8f"
                      color="black"
                      fontSize="0.875rem"
                      fontWeight="bold"
                      fontFamily="MOS"
                      px="1rem"
                      py="0.5rem"
                      borderRadius="0"
                      textTransform="uppercase"
                      transition="all 0.2s"
                      _hover={{ bg: "#18c57d" }}
                    >
                      Register Now
                    </Button>
                  </ChakraLink>
                )}
              </Box>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default function EventsPage() {
  const params = useParams();
  const router = useRouter();
  const currentPage = parseInt(params.page as string) || 1;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const eventsPerPage = 6;

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch events');
        }
        
        const data: EventsResponse = await response.json();
        console.log('Fetched events:', data);
        setEvents(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load events. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Sort events by date (newest first, TBA dates appear first)
  const sortedEvents = [...events].sort((a, b) => {
    // Handle null/undefined dates - TBA events appear first
    if (!a.Date || a.Date === 'null' || a.Date === 'undefined') {
      return -1; // TBA events first
    }
    if (!b.Date || b.Date === 'null' || b.Date === 'undefined') {
      return 1; // TBA events first
    }
    
    const dateA = new Date(a.Date).getTime();
    const dateB = new Date(b.Date).getTime();
    
    // Check for invalid dates
    if (isNaN(dateA)) return -1;
    if (isNaN(dateB)) return 1;
    
    return dateB - dateA; // Newest first
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = sortedEvents.slice(startIndex, endIndex);

  // Redirect to page 1 if invalid page number
  useEffect(() => {
    if (!loading && (currentPage < 1 || (totalPages > 0 && currentPage > totalPages))) {
      router.push('/events/1');
    }
  }, [currentPage, totalPages, loading, router]);

  const handlePageChange = (page: number) => {
    router.push(`/events/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
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
              Events
            </Heading>
            <Text
              fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
              px={{ base: "1rem", md: "0" }}
            >
              Join us for workshops, meetups, and community gatherings
            </Text>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box textAlign="center" py="4rem">
              <Spinner size="xl" color="#1fdc8f" />
              <Text mt="1rem" fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
                Loading events...
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

          {/* Events Grid */}
          {!loading && !error && currentEvents.length > 0 && (
            <>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="2rem"
              >
                {currentEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <HStack justify="center" gap={{ base: "0.25rem", sm: "0.5rem" }} mt="2rem" flexWrap="wrap">
                  <Box
                    as="button"
                    px={{ base: "0.75rem", md: "1rem" }}
                    py="0.5rem"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    color="white"
                    bg="transparent"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.3)"
                    transition="all 0.2s"
                    onClick={() => handlePageChange(currentPage - 1)}
                    opacity={currentPage === 1 ? 0.5 : 1}
                    cursor={currentPage === 1 ? "not-allowed" : "pointer"}
                    pointerEvents={currentPage === 1 ? "none" : "auto"}
                    _hover={currentPage === 1 ? {} : {
                      bg: "rgba(31, 220, 143, 0.1)",
                      borderColor: "#1fdc8f",
                    }}
                  >
                    ← Prev
                  </Box>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Box
                      key={page}
                      as="button"
                      px={{ base: "0.75rem", md: "1rem" }}
                      py="0.5rem"
                      fontSize={{ base: "0.875rem", md: "1rem" }}
                      fontWeight="bold"
                      color={currentPage === page ? "black" : "white"}
                      bg={currentPage === page ? "#1fdc8f" : "transparent"}
                      border="1px solid"
                      borderColor={currentPage === page ? "#1fdc8f" : "rgba(255, 255, 255, 0.3)"}
                      transition="all 0.2s"
                      onClick={() => handlePageChange(page)}
                      _hover={{
                        bg: currentPage === page ? "#18c57d" : "rgba(31, 220, 143, 0.1)",
                        borderColor: "#1fdc8f",
                      }}
                    >
                      {page}
                    </Box>
                  ))}

                  <Box
                    as="button"
                    px={{ base: "0.75rem", md: "1rem" }}
                    py="0.5rem"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    color="white"
                    bg="transparent"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.3)"
                    transition="all 0.2s"
                    onClick={() => handlePageChange(currentPage + 1)}
                    opacity={currentPage === totalPages ? 0.5 : 1}
                    cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
                    pointerEvents={currentPage === totalPages ? "none" : "auto"}
                    _hover={currentPage === totalPages ? {} : {
                      bg: "rgba(31, 220, 143, 0.1)",
                      borderColor: "#1fdc8f",
                    }}
                  >
                    Next →
                  </Box>
                </HStack>
              )}
            </>
          )}

          {/* No Events State */}
          {!loading && !error && events.length === 0 && (
            <Box textAlign="center" py="4rem">
              <Text fontSize="1.5rem" color="rgba(255, 255, 255, 0.7)">
                No events available at the moment. Check back soon!
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

