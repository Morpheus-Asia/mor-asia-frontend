"use client";
import { BlogPost } from "morpheus-asia/@types/blog";
import ContainerWrapper from "../ContainerWrapper";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import MarkdownRender from "morpheus-asia/components/Markdown";
export type BlogPostContainerProps = {
  blogPost: BlogPost;
  locale?: string;
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const BlogPostContainer: React.FC<BlogPostContainerProps> = (props) => {
  const { blogPost, locale } = props;
  // =============== HOOKS

  // =============== STATE

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES
  const blogPostAvatar = blogPost?.author?.avatar;
  const author = blogPostAvatar?.formats?.small?.url || blogPostAvatar?.url;
  const tags = blogPost.tags.map((tag) => tag.name);
  const blogPostContent = blogPost.content || "";

  // =============== RENDER FUNCTIONS
  const renderContent = () => {
    if (!blogPostContent) {
      return (
        <Text color="rgba(255,255,255,0.7)">
          No content available for this blog post.
        </Text>
      );
    }
    return (
      <MarkdownRender
        text={blogPostContent}
        components={{
          img: (props: any) => (
            <Image
              src={props.src}
              alt={props.alt}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ),
        }}
      />
    );
  };

  // =============== VIEWS
  // @TODO better UI
  if (!blogPost) {
    return (
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"} h={"100vh"}>
        <Text color="#FFF" fontSize="xl">
          Blog post not found
        </Text>
      </ContainerWrapper>
    );
  }
  return (
    <ContainerWrapper
      pt={"8rem"}
      width={"100%"}
      pb={"3.5rem"}
      paddingInline={10}
    >
      <VStack gap={8} align="stretch" h={"100vh"} mb={6}>
        <Box>
          <Text color="#FFF" fontSize="4xl" fontWeight="bold" mb={4}>
            {blogPost.title}
          </Text>
          <VStack
            color="rgba(255,255,255,0.7)"
            mb={6}
            align={"flex-start"}
            gap={4}
          >
            <HStack gap={4} align="center">
              {author && (
                <Box mt={1}>
                  <Image
                    src={author}
                    alt={`${blogPost.author.name}'s avatar`}
                    w="32px"
                    h="32px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Box>
              )}
              <VStack align="flex-start" gap={0.5}>
                <Text color="#FFF" fontSize="md">
                  {blogPost.author?.name}
                </Text>
                <HStack gap={1} fontSize="sm" color="rgba(255,255,255,0.7)">
                  <Text>
                    {blogPost.content
                      ? Math.max(
                          1,
                          Math.ceil(blogPost.content.split(/\s+/).length / 200)
                        )
                      : 1}{" "}
                    min read
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {/**TODO refactor this into a helper function */}
                    {new Date(blogPost.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            {tags &&
              tags.length > 0 &&
              tags.map((tagName) => (
                <Box
                  key={tagName}
                  as="span"
                  bg="#1C4532"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  {tagName}
                </Box>
              ))}
          </VStack>
        </Box>

        {blogPost.featured_image?.url && (
          <Box mb={8}>
            <Image
              src={blogPost.featured_image.url}
              alt={blogPost.title}
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
          maxW={{ base: "100%", md: "90%", lg: "1000px" }}
          mx="auto"
          px={{ base: 4, md: 0 }}
          textAlign="left"
          width="100%"
        >
          {renderContent()}
        </Box>
      </VStack>
    </ContainerWrapper>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default BlogPostContainer;
