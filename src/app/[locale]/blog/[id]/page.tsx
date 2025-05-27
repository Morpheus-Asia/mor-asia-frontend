import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";

type BlogPost = {
  id: number;
  Title: string;
  Date: string;
  Author: string;
  Tags: string;
  Body: string;
  localizations?: Array<{
    locale: string;
  }>;
};

// Constants
const IMAGE_MARKDOWN_REGEX = /!\[(.*?)\]\((.*?)\)/;

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, id } = await params;
  const response = await fetchContentType(
    "blog-posts",
    {
      filters: { 
        locale,
        id: parseInt(id)
      },
      pLevel: 4,
    },
    false
  );

  const blogPost = response?.data?.[0] as BlogPost;

  const seo = {
    metaTitle: blogPost?.Title,
    metaDescription: blogPost?.Body?.split('\n')[0] || '',
  };
  
  const metadata = generateMetadataObject(seo, locale);
  return metadata;
}

export default async function BlogPostPage({ params }: any) {
  const { locale, id } = await params;
  
  const response = await fetchContentType(
    "blog-posts",
    {
      filters: { 
        locale,
        id: parseInt(id)
      },
      pLevel: 4,
    },
    false
  );

  const blogPost = response?.data?.[0] as BlogPost;

  if (!blogPost) {
    return (
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"}>
        <Container maxW="container.xl">
          <Text color="#FFF" fontSize="xl">Blog post not found</Text>
        </Container>
      </ContainerWrapper>
    );
  }

  // Simplified localizedSlugs logic
  const localizedSlugs = {
    [locale]: "",
    ...(blogPost.localizations?.reduce((acc, { locale: loc }) => ({
      ...acc,
      [loc === "zh-Hans" ? "cn" : loc]: ""
    }), {}) || {})
  };

  // Split content into paragraphs and handle images
  const content = blogPost.Body.split('\n').map((line, index) => {
    // Check if line is an image markdown
    if (line.startsWith('![')) {
      const match = line.match(IMAGE_MARKDOWN_REGEX);
      if (match) {
        const [, alt, src] = match;
        return (
          <Box key={index} as="figure" my={4}>
            <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        );
      }
    }
    // Regular text line
    return line ? <Text key={index} mb={4}>{line}</Text> : null;
  });

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"}>
        <Container maxW="container.xl">
          <VStack gap={8} align="stretch">
            <Box>
              <Text color="#FFF" fontSize="4xl" fontWeight="bold" mb={4}>
                {blogPost.Title}
              </Text>
              <Box color="rgba(255,255,255,0.7)" mb={6}>
                <Text>By {blogPost.Author} • {new Date(blogPost.Date).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</Text>
                {blogPost.Tags && (
                  <Text mt={2}>
                    <Box as="span" bg="#1C4532" px={3} py={1} borderRadius="full" fontSize="sm">
                      {blogPost.Tags}
                    </Box>
                  </Text>
                )}
              </Box>
            </Box>
            
            <Box 
              color="#FFF" 
              fontSize="lg" 
              lineHeight="1.8"
            >
              {content}
            </Box>
          </VStack>
        </Container>
      </ContainerWrapper>
    </>
  );
} 