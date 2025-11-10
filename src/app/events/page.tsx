'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Image, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  documentId: string;
  Title: string;
  Date: string;
  Description: string;
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
  const { Title, Date: eventDate, Description, Cover, Register_Link } = event;
  
  // Format date and time
  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
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
      return { date: 'N/A', time: 'N/A' };
    }
  };

  const dateTime = formatDateTime(eventDate);

  // Get cover image URL
  const imageUrl = Cover?.url 
    ? (Cover.url.startsWith('http') 
        ? Cover.url 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${Cover.url}`)
    : null;

  return (
    <Box
      bg="rgba(255, 255, 255, 0.03)"
      border="2px solid #1fdc8f"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        bg: "rgba(31, 220, 143, 0.05)",
        transform: { base: "none", md: "translateY(-4px)" },
      }}
    >
      {/* Cover Image */}
      {imageUrl && (
        <Box
          w="100%"
          h="300px"
          overflow="hidden"
          position="relative"
          bg="rgba(0, 0, 0, 0.3)"
        >
          <Image
            src={imageUrl}
            alt={Cover?.alternativeText || Title || 'Event cover'}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      )}

      <Box p={{ base: "1.5rem", md: "3rem" }}>
        <VStack align="stretch" gap="1.5rem">
          <HStack gap="1rem" flexWrap="wrap">
            <Box
              bg="rgba(31, 220, 143, 0.2)"
              px="1rem"
              py="0.5rem"
              fontSize="0.875rem"
              fontWeight="bold"
              textTransform="uppercase"
              color="#1fdc8f"
            >
              Event
            </Box>
            <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="rgba(255, 255, 255, 0.7)">
              {typeof dateTime === 'object' ? dateTime.date : dateTime}
            </Text>
          </HStack>

          <Heading
            as="h3"
            fontSize={{ base: "1.5rem", sm: "2rem", md: "2.5rem" }}
            fontWeight="bold"
            color="white"
            lineHeight="1.3"
          >
            {Title || 'N/A'}
          </Heading>

          <Text
            fontSize={{ base: "1rem", md: "1.25rem" }}
            lineHeight="1.8"
            color="rgba(255, 255, 255, 0.9)"
            whiteSpace="pre-wrap"
          >
            {Description || 'N/A'}
          </Text>

          <HStack gap={{ base: "1rem", md: "2rem" }} pt="1rem" flexWrap="wrap">
            {typeof dateTime === 'object' && (
              <HStack gap="0.5rem">
                <Text fontSize={{ base: "0.875rem", md: "1rem" }} fontWeight="bold" color="#1fdc8f">
                  🕐 Time:
                </Text>
                <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="white">
                  {dateTime.time}
                </Text>
              </HStack>
            )}
          </HStack>

          {/* Register Button */}
          {Register_Link && Register_Link !== 'N/A' && (
            <Box pt="1rem">
              <Link href={Register_Link} target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "1rem", md: "1.25rem" }}
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  w={{ base: "100%", md: "auto" }}
                  _hover={{ bg: "#18c57d" }}
                >
                  Register Now
                </Box>
              </Link>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.Date) >= now);
  const pastEvents = events.filter(event => new Date(event.Date) < now);

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "4rem", md: "8rem" }} pb="4rem">
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

          {/* Upcoming Events */}
          {!loading && !error && upcomingEvents.length > 0 && (
            <Box>
              <Heading
                as="h2"
                fontSize={{ base: "1.5rem", sm: "1.75rem", md: "2rem" }}
                fontWeight="bold"
                mb="2rem"
                color="white"
              >
                Upcoming Events
              </Heading>

              <VStack gap="2rem" align="stretch">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </VStack>
            </Box>
          )}

          {/* Past Events */}
          {!loading && !error && pastEvents.length > 0 && (
            <Box>
              <Heading
                as="h2"
                fontSize={{ base: "1.5rem", sm: "1.75rem", md: "2rem" }}
                fontWeight="bold"
                mb="2rem"
                color="white"
              >
                Past Events
              </Heading>

              <VStack gap="2rem" align="stretch">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </VStack>
            </Box>
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
