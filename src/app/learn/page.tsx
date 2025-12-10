import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { getDocSections, DocSection } from "morpheus-asia/lib/strapi";
import Link from "next/link";

export default async function LearnOverviewPage() {
  let sections: DocSection[] = [];

  try {
    const response = await getDocSections();
    if (response.data) {
      sections = response.data;
    }
  } catch (error) {
    console.error('Error fetching doc sections:', error);
  }

  return (
    <VStack gap="3rem" align="stretch" w="100%">
      {/* Page Header */}
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
          Welcome To Morpheus Asia
        </Heading>
        <Text
          fontSize={{ base: "1.125rem", md: "1.25rem" }}
          color="rgba(255, 255, 255, 0.7)"
          lineHeight="1.6"
          maxW="700px"
        >
          Explore comprehensive guides, API documentation, and resources to build on the Morpheus decentralized AI network. 
          Whether you&apos;re a developer, builder, or community member, find everything you need to get started.
        </Text>
      </Box>

      {/* Quick Start Tip */}
      {sections.length > 0 && (
        <Box
          p="1.5rem"
          bg="rgba(31, 220, 143, 0.05)"
          borderLeft="3px solid #1fdc8f"
          borderRadius="4px"
        >
          <Text
            fontSize="1rem"
            color="rgba(255, 255, 255, 0.9)"
            lineHeight="1.75"
          >
            <strong>New to Morpheus?</strong> Start by exploring the sections below to understand 
            the foundational concepts and architecture of the decentralized AI network.
          </Text>
        </Box>
      )}

      {/* Doc Sections Grid */}
      {sections.length > 0 && (
        <VStack gap="1.5rem" align="stretch">
          <Text
            fontSize="1rem"
            color="rgba(255, 255, 255, 0.7)"
            textTransform="uppercase"
            letterSpacing="0.05em"
            fontWeight="600"
          >
            Documentation Sections
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="1rem">
            {sections.map((section) => {
              const docCount = section.docs?.length || 0;
              const firstDoc = section.docs && section.docs.length > 0 ? section.docs[0] : null;
              const href = firstDoc ? `/learn/${section.Slug}/${firstDoc.Slug}` : undefined;
              
              const cardContent = (
                <Box
                  p="1.5rem"
                  bg="rgba(255, 255, 255, 0.03)"
                  borderRadius="8px"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  transition="all 0.2s"
                  {...(href ? {
                    _hover: {
                      bg: "rgba(31, 220, 143, 0.08)",
                      borderColor: "rgba(31, 220, 143, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    cursor: "pointer"
                  } : {})}
                >
                  <Text
                    fontSize="1.25rem"
                    fontWeight="600"
                    color="white"
                    mb="0.5rem"
                  >
                    {section.Title}
                  </Text>
                  <Text
                    fontSize="0.875rem"
                    color="rgba(255, 255, 255, 0.5)"
                  >
                    {docCount} {docCount === 1 ? 'document' : 'documents'}
                  </Text>
                </Box>
              );
              
              return href ? (
                <Link
                  key={section.documentId}
                  href={href}
                  style={{ textDecoration: 'none' }}
                >
                  {cardContent}
                </Link>
              ) : (
                <Box key={section.documentId}>
                  {cardContent}
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      )}

      {/* Fallback when no sections */}
      {sections.length === 0 && (
        <Box
          p="2rem"
          bg="rgba(255, 255, 255, 0.03)"
          borderRadius="8px"
          border="1px solid rgba(255, 255, 255, 0.1)"
          textAlign="center"
        >
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="1rem">
            Documentation coming soon. Check back later for comprehensive guides and resources.
          </Text>
        </Box>
      )}
    </VStack>
  );
}
