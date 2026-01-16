'use client';

import { Box, Container, Heading, Text, VStack, Spinner, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Form {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface FormsResponse {
  data: Form[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const FormCard = ({ form }: { form: Form }) => {
  const router = useRouter();
  const { Name, Slug } = form;
  
  const handleCardClick = () => {
    router.push(`/form/${Slug}`);
  };

  return (
    <Box
      onClick={handleCardClick}
      bg="rgba(255, 255, 255, 0.03)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      overflow="hidden"
      transition="all 0.3s"
      cursor="pointer"
      p="2rem"
      _hover={{
        bg: "rgba(31, 220, 143, 0.05)",
        borderColor: "#1fdc8f",
        transform: "translateY(-4px)",
      }}
    >
      <VStack align="stretch" gap="1rem">
        <Heading
          as="h3"
          fontSize="1.5rem"
          fontWeight="bold"
          color="white"
          lineHeight="1.3"
        >
          {Name || 'Untitled Form'}
        </Heading>

        <Text
          fontSize="0.875rem"
          color="#1fdc8f"
          fontWeight="bold"
          _hover={{ textDecoration: 'underline' }}
        >
          Fill out this form →
        </Text>
      </VStack>
    </Box>
  );
};

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchForms() {
      try {
        setLoading(true);
        const response = await fetch('/api/forms');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch forms');
        }
        
        const data: FormsResponse = await response.json();
        console.log('Fetched forms:', data);
        setForms(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching forms:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load forms. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

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
              Forms
            </Heading>
            <Text
              fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
              px={{ base: "1rem", md: "0" }}
            >
              Apply, contribute, and engage with Morpheus Asia
            </Text>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box textAlign="center" py="4rem">
              <Spinner size="xl" color="#1fdc8f" />
              <Text mt="1rem" fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
                Loading forms...
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

          {/* Forms Grid */}
          {!loading && !error && forms.length > 0 && (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap="2rem"
            >
              {forms.map(form => (
                <FormCard key={form.id} form={form} />
              ))}
            </Grid>
          )}

          {/* No Forms State */}
          {!loading && !error && forms.length === 0 && (
            <Box textAlign="center" py="4rem">
              <Text fontSize="1.5rem" color="rgba(255, 255, 255, 0.7)">
                No forms available at the moment. Check back soon!
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
