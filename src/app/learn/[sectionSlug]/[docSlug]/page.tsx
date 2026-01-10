'use client';

import { Box, Heading, Text, VStack, Spinner, Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from "next/link";

interface Doc {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: string;
  Order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function DocPage() {
  const params = useParams();
  const sectionSlug = params.sectionSlug as string;
  const docSlug = params.docSlug as string;
  
  const [doc, setDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoc() {
      try {
        setLoading(true);
        const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
        const response = await fetch(`${STRAPI_URL}/api/docs?filters[Slug][$eq]=${docSlug}&populate=*`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch document');
        }
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setDoc(data.data[0]);
          setError(null);
        } else {
          setError('Document not found');
        }
      } catch (err) {
        console.error('Error fetching doc:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load document.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (docSlug) {
      fetchDoc();
    }
  }, [docSlug]);

  if (loading) {
    return (
      <VStack gap="2rem" align="center" py="4rem">
        <Spinner size="xl" color="#1fdc8f" />
        <Text fontSize="1rem" color="rgba(255, 255, 255, 0.7)">
          Loading document...
        </Text>
      </VStack>
    );
  }

  if (error || !doc) {
    return (
      <VStack gap="2rem" align="center" py="4rem">
        <Box
          textAlign="center"
          bg="rgba(255, 0, 0, 0.1)"
          border="1px solid rgba(255, 0, 0, 0.3)"
          borderRadius="8px"
          p="2rem"
        >
          <Heading as="h2" fontSize="1.5rem" mb="1rem" color="white">
            {error || 'Document not found'}
          </Heading>
          <Text fontSize="1rem" color="rgba(255, 255, 255, 0.8)" mb="2rem">
            The document you&apos;re looking for doesn&apos;t exist or has been removed.
          </Text>
          <Link href="/learn">
            <Box
              as="button"
              bg="#1fdc8f"
              color="black"
              fontSize="0.875rem"
              fontWeight="bold"
              fontFamily="MOS"
              px="1.5rem"
              py="0.75rem"
              borderRadius="0"
              textTransform="uppercase"
              transition="all 0.2s"
              _hover={{ bg: "#18c57d" }}
            >
              Back to Learn
            </Box>
          </Link>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack gap="2rem" align="stretch" w="100%">
      {/* Breadcrumb */}
      <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.6)">
        <ChakraLink as={Link} href="/learn" color="#1fdc8f" _hover={{ textDecoration: 'underline' }}>
          Learn
        </ChakraLink>
        {' / '}
        <Text as="span" color="rgba(255, 255, 255, 0.6)">
          {sectionSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Text>
        {' / '}
        <Text as="span" color="rgba(255, 255, 255, 0.9)">{doc.Title}</Text>
      </Text>

      {/* Doc Header */}
      <Box>
        <Heading
          as="h1"
          fontSize={{ base: "2rem", md: "2.5rem", lg: "3rem" }}
          fontWeight="bold"
          mb="1rem"
          color="white"
          lineHeight="1.2"
          letterSpacing="-0.02em"
        >
          {doc.Title}
        </Heading>
        {doc.updatedAt && (
          <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)" fontFamily="'Helvetica Neue', Helvetica, sans-serif">
            Last updated: {new Date(doc.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        )}
      </Box>

      {/* Doc Content */}
      <Box
        className="doc-content"
        fontSize={{ base: "1rem", md: "1.0625rem" }}
        lineHeight="1.8"
        color="white"
        css={{
          '& > :first-of-type': {
            marginTop: '0',
          },
          '& h1': {
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '2.5rem',
            marginBottom: '1.25rem',
            lineHeight: '1.3',
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          },
          '& h2': {
            fontSize: 'clamp(1.4rem, 4vw, 1.75rem)',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '2rem',
            marginBottom: '1rem',
            lineHeight: '1.3',
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          },
          '& h3': {
            fontSize: 'clamp(1.2rem, 3.5vw, 1.4rem)',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '1.75rem',
            marginBottom: '0.875rem',
            lineHeight: '1.4',
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          },
          '& h4': {
            fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '1.5rem',
            marginBottom: '0.75rem',
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
          {doc.Content || ''}
        </ReactMarkdown>
      </Box>
    </VStack>
  );
}
