'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Image, Link as ChakraLink, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

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

interface EventResponse {
  data: Event;
}

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${slug}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch event');
        }
        
        const data: EventResponse = await response.json();
        console.log('Fetched event:', data);
        setEvent(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching event:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load event. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  // Format date and time
  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString || dateString === 'null' || dateString === 'undefined') {
      return 'TBA';
    }
    try {
      const date = new Date(dateString);
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

  const dateTime = formatDateTime(event?.Date);
  const isPast = dateTime !== 'TBA' && event?.Date && new Date(event.Date) < new Date();

  // Get cover image URL
  const imageUrl = event?.Cover?.url 
    ? (event.Cover.url.startsWith('http') 
        ? event.Cover.url 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${event.Cover.url}`)
    : null;

  if (loading) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
          <Box textAlign="center" py="4rem">
            <Spinner size="xl" color="#1fdc8f" />
            <Text mt="1rem" fontSize={{ base: "1rem", md: "1.25rem" }} color="rgba(255, 255, 255, 0.7)">
              Loading event...
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !event) {
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
                {error || 'Event not found'}
              </Heading>
              <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="rgba(255, 255, 255, 0.8)" mb="2rem">
                The event you&apos;re looking for doesn&apos;t exist or has been removed.
              </Text>
              <Link href="/events">
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
                  Back to Events
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
          <Link href="/events">
            <Text
              color="#1fdc8f"
              fontSize={{ base: "0.875rem", md: "1rem" }}
              fontWeight="bold"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              ← Back to Events
            </Text>
          </Link>

          {/* Event Header */}
          <Box>
            <HStack gap="1rem" mb="1.5rem" flexWrap="wrap">
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
              <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="white" fontWeight="bold">
                {typeof dateTime === 'object' ? dateTime.date : dateTime}
              </Text>
              {typeof dateTime === 'object' && (
                <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="white" fontWeight="bold">
                  {dateTime.time}
                </Text>
              )}
            </HStack>

            {/* Title */}
            <Heading
              as="h1"
              fontSize={{ base: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" }}
              fontWeight="bold"
              mb="2rem"
              lineHeight="1.2"
              color="white"
            >
              {event.Title}
            </Heading>

            {/* Cover Image */}
            {imageUrl && (
              <Box
                display="flex"
                justifyContent="flex-start"
                w="100%"
                mb="2rem"
              >
                <Box
                  maxW={{ base: "100%", md: "400px", lg: "500px" }}
                  w="100%"
                  overflow="hidden"
                  position="relative"
                  bg="rgba(9, 13, 14, 0.3)"
                  borderRadius="8px"
                >
                  <Image
                    src={imageUrl}
                    alt={event.Cover?.alternativeText || event.Title || 'Event cover'}
                    w="100%"
                    h="auto"
                    objectFit="contain"
                  />
                </Box>
              </Box>
            )}

            {/* Description */}
            <Box
              className="event-content"
              fontSize={{ base: "1.125rem", md: "1.25rem" }}
              lineHeight="1.8"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              pb="2rem"
              borderBottom="2px solid rgba(255, 255, 255, 0.1)"
              css={{
                '& h1': {
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: '2rem',
                  marginBottom: '1rem',
                  lineHeight: '1.3',
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                },
                '& h2': {
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: '1.5rem',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3',
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                },
                '& h3': {
                  fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: '1.25rem',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4',
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                },
                '& p': {
                  marginBottom: '1.25rem',
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
                  marginBottom: '1.25rem',
                  marginTop: '0.75rem',
                  listStyleType: 'disc',
                  paddingLeft: '0.5rem',
                },
                '& ol': {
                  marginLeft: 'clamp(1rem, 5vw, 2rem)',
                  marginBottom: '1.25rem',
                  marginTop: '0.75rem',
                  listStyleType: 'decimal',
                  paddingLeft: '0.5rem',
                },
                '& li': {
                  marginBottom: '0.5rem',
                  color: 'white',
                  lineHeight: '1.7',
                  paddingLeft: '0.5rem',
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                },
                '& li::marker': {
                  color: '#1fdc8f',
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
                '& blockquote': {
                  borderLeft: '4px solid #1fdc8f',
                  paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  color: 'white',
                  fontStyle: 'italic',
                  background: 'rgba(31, 220, 143, 0.05)',
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
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
              }}
            >
              <ReactMarkdown>{event.Description}</ReactMarkdown>
            </Box>
          </Box>

          {/* Register Button */}
          {event.Register_Link && event.Register_Link !== 'N/A' && (
            <Box>
              {isPast ? (
                <Button
                  bg="rgba(255, 255, 255, 0.2)"
                  color="rgba(255, 255, 255, 0.5)"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "1rem", md: "1.25rem" }}
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
                  Registration Closed
                </Button>
              ) : (
                <ChakraLink href={event.Register_Link} target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                  <Button
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
                    _hover={{ bg: "#18c57d" }}
                    size="lg"
                  >
                    Register Now
                  </Button>
                </ChakraLink>
              )}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

