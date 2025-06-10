import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Box, Container, Text, VStack, HStack, Image } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import { BlogPost } from "morpheus-asia/components/BlogList/props";

const IMAGE_MARKDOWN_REGEX = /!\[(.*?)\]\((.*?)\)/;

export async function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const response = await fetchContentType(
    "blog-posts",
    {
      filters: { 
        locale,
        slug
      },
      populate: {
        author: {
          populate: ['Avatar']
        },
        Featured_Image: true
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
  const { locale, slug } = await params;
  
  const response = await fetchContentType(
    "blog-posts",
    {
      filters: { 
        locale,
        slug
      },
      populate: {
        author: {
          populate: ['Avatar']
        },
        Featured_Image: true
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

  // Build localizedSlugs with actual slug values from localizations
  const localizedSlugs = {
    [locale]: slug,
    ...(blogPost.localizations?.reduce((acc, { locale: loc, slug: locSlug }) => ({
      ...acc,
      [loc === "zh-Hans" ? "cn" : loc]: locSlug
    }), {}) || {})
  };

  // Split content into paragraphs and handle images - with null check
  const content = blogPost.Body ? blogPost.Body.split('\n').map((line, index) => {
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
  }) : [<Text key="no-content" color="rgba(255,255,255,0.7)">No content available</Text>];

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
                <HStack gap={2} align="flex-start">
                  {blogPost.author?.Avatar?.formats?.small?.url && (
                    <Box mt={1}>
                      <Image
                        src={blogPost.author.Avatar.formats.small.url}
                        alt={`${blogPost.author.Name}'s avatar`}
                        w="32px"
                        h="32px"
                        borderRadius="full"
                        objectFit="cover"
                      />
                    </Box>
                  )}
                  <VStack align="flex-start" gap={0.5}>
                    <Text color="#FFF" fontSize="md">
                      {blogPost.author?.Name}
                    </Text>
                    <HStack gap={1} fontSize="sm" color="rgba(255,255,255,0.7)">
                      <Text>
                        {blogPost.Body ? Math.max(1, Math.ceil(blogPost.Body.split(/\s+/).length / 200)) : 1} min read
                      </Text>
                      <Text>•</Text>
                      <Text>
                        {new Date(blogPost.Date).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                {blogPost.Tags && (
                  <Text mt={4}>
                    <Box as="span" bg="#1C4532" px={3} py={1} borderRadius="full" fontSize="sm">
                      {blogPost.Tags}
                    </Box>
                  </Text>
                )}
              </Box>
            </Box>

            {blogPost.Featured_Image?.url && (
              <Box mb={8}>
                <Image
                  src={blogPost.Featured_Image.url}
                  alt={blogPost.Title}
                  width="100%"
                  height="auto"
                  borderRadius="lg"
                />
              </Box>
            )}
            
            <Box 
              color="#FFF" 
              fontSize="lg" 
              lineHeight="1.8"
              maxW={{ base: "100%", md: "90%", lg: "800px" }}
              mx="auto"
              px={{ base: 4, md: 0 }}
              textAlign="left"
              width="100%"
            >
              {content}
            </Box>
          </VStack>
        </Container>
      </ContainerWrapper>
    </>
  );
} 