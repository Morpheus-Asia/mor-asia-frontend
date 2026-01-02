'use client';

import { Box, Heading, Text, VStack, SimpleGrid, Spinner, Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Doc {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DocSection {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  docs?: Doc[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DocSectionsResponse {
  data: DocSection[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface LearnPage {
  Title: string;
  Content: string;
}

interface LearnPageResponse {
  data: LearnPage;
  meta: {};
}

export default function LearnOverviewPage() {
  const [sections, setSections] = useState<DocSection[]>([]);
  const [learnPage, setLearnPage] = useState<LearnPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch learn page content
        const learnPageResponse = await fetch('/api/learn-page');
        if (learnPageResponse.ok) {
          const learnPageData: LearnPageResponse = await learnPageResponse.json();
          setLearnPage(learnPageData.data || null);
        } else {
          console.error('Failed to fetch learn page');
        }
        
        // Fetch doc sections
        const sectionsResponse = await fetch('/api/doc-sections');
        if (!sectionsResponse.ok) {
          const errorData = await sectionsResponse.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch documentation');
        }
        
        const sectionsData: DocSectionsResponse = await sectionsResponse.json();
        console.log('Fetched doc sections:', sectionsData);
        setSections(sectionsData.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load documentation. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <VStack gap="3rem" align="stretch" w="100%">
      {/* Page Header */}
      {learnPage && (
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "2.25rem", md: "2.75rem", lg: "3.25rem" }}
            fontWeight="bold"
            mb="1rem"
            color="white"
            lineHeight="1.2"
            letterSpacing="-0.02em"
          >
            {learnPage.Title}
          </Heading>
          <Text
            fontSize={{ base: "1.125rem", md: "1.25rem" }}
            color="white"
            lineHeight="1.6"
            as="div"
            fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            className="learn-content"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ children }) => <Text as="p" mb="1rem" _last={{ mb: 0 }} color="white" fontFamily="'Helvetica Neue', Helvetica, sans-serif">{children}</Text>,
                a: ({ href, children }) => (
                  <ChakraLink href={href} target="_blank" rel="noopener noreferrer" color="#1fdc8f">
                    {children}
                  </ChakraLink>
                ),
              }}
            >
              {learnPage.Content || ''}
            </ReactMarkdown>
          </Text>
        </Box>
      )}

      {/* Loading State */}
      {loading && (
        <Box textAlign="center" py="4rem">
          <Spinner size="xl" color="#1fdc8f" />
          <Text mt="1rem" fontSize="1.25rem" color="white" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
            Loading documentation...
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

      {/* Fallback when no sections */}
      {!loading && !error && sections.length === 0 && (
        <Box
          p="2rem"
          bg="rgba(255, 255, 255, 0.03)"
          borderRadius="8px"
          border="1px solid rgba(255, 255, 255, 0.1)"
          textAlign="center"
        >
          <Text color="white" fontSize="1rem" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
            Documentation coming soon. Check back later for comprehensive guides and resources.
          </Text>
        </Box>
      )}
    </VStack>
  );
}
