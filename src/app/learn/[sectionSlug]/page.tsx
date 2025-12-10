import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { getDocSectionBySlug } from "morpheus-asia/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    sectionSlug: string;
  }>;
}

export default async function DocSectionPage({ params }: PageProps) {
  const { sectionSlug } = await params;

  try {
    const response = await getDocSectionBySlug(sectionSlug);
    const section = response.data;

    const docs = section.docs || [];

    return (
      <VStack gap="3rem" align="stretch" maxW="900px">
        {/* Section Header */}
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
            {section.Title}
          </Heading>
        </Box>

        {/* List of docs in this section */}
        {docs.length > 0 && (
          <VStack gap="1rem" align="stretch">
            <Text
              fontSize="1rem"
              color="rgba(255, 255, 255, 0.7)"
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontWeight="600"
            >
              In this section
            </Text>
            <VStack gap="0.75rem" align="stretch">
              {docs.map((doc) => (
                <Link
                  key={doc.documentId}
                  href={`/learn/${sectionSlug}/${doc.Slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    p="1.25rem"
                    bg="rgba(255, 255, 255, 0.03)"
                    borderRadius="8px"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    transition="all 0.2s"
                    _hover={{
                      bg: "rgba(31, 220, 143, 0.08)",
                      borderColor: "rgba(31, 220, 143, 0.3)",
                      transform: "translateX(4px)",
                    }}
                  >
                    <Text
                      fontSize="1.125rem"
                      fontWeight="600"
                      color="white"
                      mb="0.25rem"
                    >
                      {doc.Title}
                    </Text>
                  </Box>
                </Link>
              ))}
            </VStack>
          </VStack>
        )}

        {docs.length === 0 && (
          <Box
            p="1.5rem"
            bg="rgba(255, 255, 255, 0.03)"
            borderRadius="8px"
            border="1px solid rgba(255, 255, 255, 0.1)"
          >
            <Text color="rgba(255, 255, 255, 0.6)">
              No documents in this section yet.
            </Text>
          </Box>
        )}
      </VStack>
    );
  } catch (error) {
    console.error('Error fetching doc section:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { sectionSlug } = await params;

  try {
    const response = await getDocSectionBySlug(sectionSlug);
    const section = response.data;

    return {
      title: `${section.Title} | Learn | Morpheus Asia`,
      description: `Documentation for ${section.Title} on Morpheus Asia.`,
    };
  } catch {
    return {
      title: "Documentation | Morpheus Asia",
    };
  }
}
