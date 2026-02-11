'use client';

import { Box, Container, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface IdeaBank {
  id: number;
  documentId: string;
  Name: string;
  slug: string;
  Description?: string;
  Budget?: string;
  Contact?: string;
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
            <Text fontSize={{ base: "0.875rem", md: "1rem" }} color="rgba(255, 255, 255, 0.5)" mb="1rem">
              {new Date(ideaBank.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>

            {/* Name */}
            <Heading
              as="h1"
              fontSize={{ base: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" }}
              fontWeight="bold"
              lineHeight="1.2"
              color="white"
              mb="1.5rem"
            >
              {ideaBank.Name}
            </Heading>
          </Box>

          {/* Description */}
          {ideaBank.Description && (
            <Box
              className="idea-bank-content"
              fontSize={{ base: "1rem", md: "1.125rem" }}
              lineHeight="1.8"
              color="white"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {ideaBank.Description}
              </ReactMarkdown>
            </Box>
          )}

          {/* Budget & Contact */}
          {(ideaBank.Budget || ideaBank.Contact) && (
            <Box
              bg="rgba(255, 255, 255, 0.03)"
              border="2px solid rgba(255, 255, 255, 0.2)"
              p={{ base: "1.25rem", md: "1.5rem" }}
            >
              <VStack gap="1rem" align="stretch">
                {ideaBank.Budget && (
                  <Box>
                    <Text fontSize="0.875rem" fontWeight="bold" color="#1fdc8f" textTransform="uppercase" mb="0.25rem">
                      Budget
                    </Text>
                    <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="white">
                      {ideaBank.Budget}
                    </Text>
                  </Box>
                )}
                {ideaBank.Contact && (
                  <Box>
                    <Text fontSize="0.875rem" fontWeight="bold" color="#1fdc8f" textTransform="uppercase" mb="0.25rem">
                      Contact
                    </Text>
                    <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="white">
                      {ideaBank.Contact}
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
