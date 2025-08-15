"use client";
import { BlogPost } from "morpheus-asia/@types/blog";
import ContainerWrapper from "../ContainerWrapper";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import MarkdownRender from "morpheus-asia/components/Markdown";
import { getDictionary } from "morpheus-asia/i18n";
export type BlogPostContainerProps = {
  blogPost: BlogPost;
  locale?: string;
  title?: string;
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
  const tags = blogPost?.tags?.map((tag) => tag?.name) || [];
  const blogPostContent = blogPost?.content || "";
  const blogLocale = getDictionary(locale)?.blogPage;

  // =============== RENDER FUNCTIONS
  const renderContent = () => {
    if (!blogPostContent) {
      return <Text color="rgba(255,255,255,0.7)">{blogLocale?.noContent}</Text>;
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
          h1: (props: any) => (
            <Text
              as="h1"
              fontSize="3xl"
              fontWeight="bold"
              color="#FFF"
              mb={6}
              mt={8}
              lineHeight="1.2"
            >
              {props.children}
            </Text>
          ),
          h2: (props: any) => (
            <Text
              as="h2"
              fontSize="2xl"
              fontWeight="bold"
              color="#FFF"
              mb={4}
              mt={6}
              lineHeight="1.3"
            >
              {props.children}
            </Text>
          ),
          h3: (props: any) => (
            <Text
              as="h3"
              fontSize="xl"
              fontWeight="bold"
              color="#FFF"
              mb={3}
              mt={5}
              lineHeight="1.4"
            >
              {props.children}
            </Text>
          ),
          h4: (props: any) => (
            <Text
              as="h4"
              fontSize="lg"
              fontWeight="bold"
              color="#FFF"
              mb={3}
              mt={4}
              lineHeight="1.4"
            >
              {props.children}
            </Text>
          ),
          h5: (props: any) => (
            <Text
              as="h5"
              fontSize="md"
              fontWeight="bold"
              color="#FFF"
              mb={2}
              mt={4}
              lineHeight="1.5"
            >
              {props.children}
            </Text>
          ),
          h6: (props: any) => (
            <Text
              as="h6"
              fontSize="sm"
              fontWeight="bold"
              color="#FFF"
              mb={2}
              mt={3}
              lineHeight="1.5"
            >
              {props.children}
            </Text>
          ),
          p: (props: any) => (
            <Text
              color="rgba(255,255,255,0.9)"
              mb={4}
              lineHeight="1.8"
              fontSize="md"
            >
              {props.children}
            </Text>
          ),
          ul: (props: any) => (
            <Box as="ul" mb={4} pl={6} color="rgba(255,255,255,0.9)">
              {props.children}
            </Box>
          ),
          ol: (props: any) => (
            <Box as="ol" mb={4} pl={6} color="rgba(255,255,255,0.9)">
              {props.children}
            </Box>
          ),
          li: (props: any) => (
            <Text as="li" mb={2} lineHeight="1.7">
              {props.children}
            </Text>
          ),
          blockquote: (props: any) => (
            <Box
              as="blockquote"
              borderLeft="4px solid"
              borderColor="rgba(255,255,255,0.3)"
              pl={4}
              py={2}
              mb={4}
              fontStyle="italic"
              color="rgba(255,255,255,0.8)"
              bg="rgba(255,255,255,0.05)"
              borderRadius="md"
            >
              {props.children}
            </Box>
          ),
          code: (props: any) => (
            <Text
              as="code"
              bg="rgba(255,255,255,0.1)"
              px={2}
              py={1}
              borderRadius="sm"
              fontSize="sm"
              fontFamily="mono"
              color="rgba(255,255,255,0.95)"
            >
              {props.children}
            </Text>
          ),
          pre: (props: any) => (
            <Box
              as="pre"
              bg="rgba(255,255,255,0.1)"
              p={4}
              borderRadius="md"
              mb={4}
              overflow="auto"
              fontSize="sm"
              fontFamily="mono"
              color="rgba(255,255,255,0.95)"
            >
              {props.children}
            </Box>
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
          {blogLocale?.notFound}
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
      <VStack gap={8} align="stretch" minH={"100vh"} mb={6}>
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
                    {blogLocale?.minRead}
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
