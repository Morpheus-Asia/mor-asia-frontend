'use client';

import { Box, Container, Heading, Text, VStack, HStack, Button, Link, Grid } from "@chakra-ui/react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  registrationLink?: string;
  status: 'upcoming' | 'past';
}

const events: Event[] = [
  {
    id: '1',
    title: 'Morpheus Asia Summit 2025',
    date: 'December 15, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'Singapore',
    description: 'Join us for our flagship annual event featuring keynotes from industry leaders, technical workshops, and networking opportunities with the brightest minds in AI and blockchain.',
    status: 'upcoming',
    registrationLink: '#',
  },
  {
    id: '2',
    title: 'Smart Agents Workshop',
    date: 'November 20, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Online',
    description: 'A hands-on workshop covering the fundamentals of building and deploying smart agents on the Morpheus network. Perfect for developers looking to get started.',
    status: 'upcoming',
    registrationLink: '#',
  },
  {
    id: '3',
    title: 'DeAI Developer Meetup',
    date: 'November 5, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Hong Kong',
    description: 'An informal gathering for developers interested in decentralized AI. Share ideas, collaborate on projects, and connect with fellow builders.',
    status: 'upcoming',
    registrationLink: '#',
  },
  {
    id: '4',
    title: 'Morpheus Asia Launch Event',
    date: 'October 1, 2025',
    time: '3:00 PM - 8:00 PM',
    location: 'Tokyo',
    description: 'The official launch event for Morpheus Asia, featuring presentations on the vision, roadmap, and opportunities for the Asian community.',
    status: 'past',
  },
];

const EventCard = ({ event }: { event: Event }) => {
  const isPast = event.status === 'past';
  
  return (
    <Box
      bg="rgba(31, 220, 143, 0.05)"
      border="1px solid"
      borderColor={isPast ? "rgba(255, 255, 255, 0.2)" : "#1fdc8f"}
      p="2rem"
      transition="all 0.3s"
      _hover={{
        bg: "rgba(31, 220, 143, 0.1)",
        transform: "translateY(-4px)",
      }}
      opacity={isPast ? 0.7 : 1}
    >
      <VStack align="stretch" gap="1rem">
        <HStack justify="space-between" align="flex-start">
          <Heading
            as="h3"
            fontSize="1.75rem"
            fontWeight="bold"
            color="white"
          >
            {event.title}
          </Heading>
          {isPast && (
            <Box
              bg="rgba(255, 255, 255, 0.2)"
              px="0.75rem"
              py="0.25rem"
              fontSize="0.75rem"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Past
            </Box>
          )}
        </HStack>
        
        <VStack align="stretch" gap="0.5rem" fontSize="1rem" color="rgba(255, 255, 255, 0.8)">
          <HStack>
            <Text fontWeight="bold">📅</Text>
            <Text>{event.date}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">⏰</Text>
            <Text>{event.time}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">📍</Text>
            <Text>{event.location}</Text>
          </HStack>
        </VStack>
        
        <Text
          fontSize="1.125rem"
          lineHeight="1.7"
          color="rgba(255, 255, 255, 0.9)"
        >
          {event.description}
        </Text>
        
        {!isPast && event.registrationLink && (
          <Box pt="1rem">
            <Link href={event.registrationLink} _hover={{ textDecoration: 'none' }}>
              <Button
                bg="#1fdc8f"
                color="black"
                fontSize="1rem"
                fontWeight="bold"
                fontFamily="MOS"
                px="2rem"
                py="1.25rem"
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                w="full"
                _hover={{ bg: "#18c57d" }}
              >
                Register Now
              </Button>
            </Link>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default function EventsPage() {
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  return (
    <Box as="main" position="relative" minH="100vh" pt="3rem" pb="4rem">
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
              Events
            </Heading>
            <Text
              fontSize="1.5rem"
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              Join us at upcoming events and stay connected with the Morpheus Asia community. 
              Explore workshops, meetups, and conferences across Asia.
            </Text>
          </Box>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <VStack align="stretch" gap="2rem">
              <Heading
                as="h2"
                fontSize="2.5rem"
                fontWeight="bold"
                color="#1fdc8f"
              >
                Upcoming Events
              </Heading>
              <Grid
                templateColumns={{ base: "1fr", md: "1fr" }}
                gap="2rem"
              >
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Grid>
            </VStack>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <VStack align="stretch" gap="2rem">
              <Heading
                as="h2"
                fontSize="2.5rem"
                fontWeight="bold"
                color="rgba(255, 255, 255, 0.6)"
              >
                Past Events
              </Heading>
              <Grid
                templateColumns={{ base: "1fr", md: "1fr" }}
                gap="2rem"
              >
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Grid>
            </VStack>
          )}

          {/* Stay Updated Section */}
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
            >
              Don&apos;t miss out on upcoming events. Join our community channels to stay informed about the latest announcements.
            </Text>
            <HStack gap="1rem" justify="center" flexWrap="wrap">
              <Link href="https://t.me/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Button
                  bg="#1fdc8f"
                  color="black"
                  fontSize="1rem"
                  fontWeight="bold"
                  fontFamily="MOS"
                  px="2rem"
                  py="1.25rem"
                  h="auto"
                  borderRadius="0"
                  textTransform="uppercase"
                  _hover={{ bg: "#18c57d" }}
                >
                  Telegram
                </Button>
              </Link>
              <Link href="https://twitter.com/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Button
                  bg="#1fdc8f"
                  color="black"
                  fontSize="1rem"
                  fontWeight="bold"
                  fontFamily="MOS"
                  px="2rem"
                  py="1.25rem"
                  h="auto"
                  borderRadius="0"
                  textTransform="uppercase"
                  _hover={{ bg: "#18c57d" }}
                >
                  X (Twitter)
                </Button>
              </Link>
              <Link href="https://discord.gg/morpheus" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Button
                  bg="#1fdc8f"
                  color="black"
                  fontSize="1rem"
                  fontWeight="bold"
                  fontFamily="MOS"
                  px="2rem"
                  py="1.25rem"
                  h="auto"
                  borderRadius="0"
                  textTransform="uppercase"
                  _hover={{ bg: "#18c57d" }}
                >
                  Discord
                </Button>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
