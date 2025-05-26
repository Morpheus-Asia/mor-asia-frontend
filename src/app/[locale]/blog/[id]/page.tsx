import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, id } = params;
  const blogPost = await fetchContentType(
    "blog-posts",
    {
      filters: { 
        locale,
        id: parseInt(id)
      },
      pLevel: 4,
    },
    true
  );

  const seo = {
    metaTitle: blogPost?.Title,
    metaDescription: blogPost?.Body?.[0]?.children?.[0]?.text || '',
  };
  
  const metadata = generateMetadataObject(seo, locale);
  return metadata;
}

export default async function BlogPostPage({ params }: any) {
  const { locale, id } = params;
  
  const blogPost = await fetchContentType(
    "blog-posts",
    {
      filters: { 
        locale,
        id: parseInt(id)
      },
      pLevel: 4,
    },
    true
  );

  if (!blogPost) {
    return (
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"}>
        <Container maxW="container.xl">
          <Text color="#FFF" fontSize="xl">Blog post not found</Text>
        </Container>
      </ContainerWrapper>
    );
  }

  const localizedSlugs = blogPost?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      if (localization.locale === "zh-Hans") {
        acc["cn"] = "";
        return acc;
      }
      acc[localization.locale] = "";
      return acc;
    },
    { [locale]: "" }
  );

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
              {blogPost.Body.map((block: any, index: number) => (
                <Box key={index} mb={4}>
                  {block.children.map((child: any, childIndex: number) => (
                    <Text key={childIndex}>{child.text}</Text>
                  ))}
                </Box>
              ))}
            </Box>
          </VStack>
        </Container>
      </ContainerWrapper>
    </>
  );
} 