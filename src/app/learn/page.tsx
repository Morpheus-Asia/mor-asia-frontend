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
          <Box
            className="doc-content"
            fontSize={{ base: "1rem", md: "1.0625rem" }}
            lineHeight="1.8"
            color="white"
            css={{
              '& h1': {
                fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '2.5rem',
                marginBottom: '1.25rem',
                lineHeight: '1.3',
              },
              '& h2': {
                fontSize: 'clamp(1.4rem, 4vw, 1.75rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '2rem',
                marginBottom: '1rem',
                lineHeight: '1.3',
              },
              '& h3': {
                fontSize: 'clamp(1.2rem, 3.5vw, 1.4rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '1.75rem',
                marginBottom: '0.875rem',
                lineHeight: '1.4',
              },
              '& h4': {
                fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '1.5rem',
                marginBottom: '0.75rem',
                lineHeight: '1.4',
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
                marginLeft: 'clamp(1rem, 5vw, 1.5rem)',
                marginBottom: '1.25rem',
                marginTop: '0.75rem',
                listStyleType: 'disc',
                paddingLeft: '0.5rem',
              },
              '& ol': {
                marginLeft: 'clamp(1rem, 5vw, 1.5rem)',
                marginBottom: '1.25rem',
                marginTop: '0.75rem',
                listStyleType: 'decimal',
                paddingLeft: '0.5rem',
              },
              '& li': {
                marginBottom: '0.5rem',
                color: 'white',
                lineHeight: '1.7',
                paddingLeft: '0.25rem',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& li::marker': {
                color: '#1fdc8f',
              },
              '& li > p': {
                marginBottom: '0.25rem',
                display: 'inline',
              },
              '& ul ul, & ol ol, & ul ol, & ol ul': {
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              },
              '& hr': {
                border: 'none',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                marginTop: '2rem',
                marginBottom: '2rem',
              },
              '& strong': {
                fontWeight: 'bold',
                color: 'white',
              },
              '& em': {
                fontStyle: 'italic',
                color: 'white',
              },
              '& code': {
                background: 'rgba(31, 220, 143, 0.1)',
                color: '#1fdc8f',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              },
              '& pre': {
                background: 'rgba(9, 13, 14, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'clamp(1rem, 3vw, 1.25rem)',
                borderRadius: '8px',
                overflow: 'auto',
                marginBottom: '1.25rem',
                marginTop: '0.75rem',
              },
              '& pre code': {
                background: 'transparent',
                padding: 0,
                color: 'white',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              },
              '& blockquote': {
                borderLeft: '3px solid #1fdc8f',
                paddingLeft: 'clamp(0.75rem, 3vw, 1.25rem)',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                marginTop: '1.25rem',
                marginBottom: '1.25rem',
                color: 'white',
                fontStyle: 'italic',
                background: 'rgba(31, 220, 143, 0.05)',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              },
              '& blockquote p': {
                marginBottom: '0.5rem',
              },
              '& img': {
                maxWidth: '100%',
                borderRadius: '8px',
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
              },
              '& table': {
                width: '100%',
                marginBottom: '1.25rem',
                marginTop: '0.75rem',
                borderCollapse: 'collapse',
                display: 'block',
                overflowX: 'auto',
              },
              '& th, & td': {
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                textAlign: 'left',
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
              components={{
                a: ({ href, children }) => (
                  <ChakraLink href={href} target="_blank" rel="noopener noreferrer" color="#1fdc8f">
                    {children}
                  </ChakraLink>
                ),
              }}
            >
              {learnPage.Content || ''}
            </ReactMarkdown>
          </Box>
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
