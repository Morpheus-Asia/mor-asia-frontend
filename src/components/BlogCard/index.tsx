import { Image, Stack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Text from "../Text";
import { getPreviewText } from "morpheus-asia/utils/helper";
import { ReactNode } from "react";
import { BlogPost } from "morpheus-asia/@types/blog";

export type BlogCardProps = {
  post: BlogPost;
  locale: string;
};

export type BlogCardWrapperProps = {
  children: ReactNode;
};

export const BlogCardWrapper: React.FC<BlogCardWrapperProps> = (props) => {
  const { children } = props;
  return (
    <Stack
      background="rgba(255,255,255,0.05)"
      borderRadius={8}
      overflow="hidden"
      height="100%"
      minH="400px"
      maxH="500px"
      display="flex"
      flexDirection="column"
      transition="all 0.2s"
      maxW="100%"
      width="100%"
      minW="0"
      _hover={{
        background: "rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </Stack>
  );
};

export const BlogCard: React.FC<BlogCardProps> = (props) => {
  const { post, locale } = props;
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      style={{ textDecoration: "none" }}
    >
      <BlogCardWrapper>
        {post.featured_image?.formats?.small?.url ? (
          <Image
            src={post.featured_image.formats.small.url}
            alt={post.title}
            width="100%"
            height="200px"
            objectFit="cover"
            flexShrink={0}
          />
        ) : (
          <Stack
            h={200}
            w={"full"}
            bgColor={"#020f08"}
            bgImage={
              "radial-gradient(circle at 20% center, #0aff7b22, transparent 60%), radial-gradient(circle at 80% center, #0aff7b22, transparent 60%)"
            }
            justify={"center"}
            align={"center"}
            filter="blur(0.5px)"
          >
            <Text
              fontSize={"2xl"}
              color="primary.300"
              textShadow={"0 0 4px rgba(255, 255, 255, 0.2)"}
            >
              Morpheus Asia Blog
            </Text>
          </Stack>
        )}
        <VStack
          alignItems="flex-start"
          gap={3}
          paddingInline={4}
          paddingBlock={3}
          flex="1"
          justify="space-between"
          overflow="hidden"
          maxW="100%"
        >
          <VStack
            alignItems="flex-start"
            gap={3}
            flex="1"
            overflow="hidden"
            maxW="100%"
          >
            <Text color="#FFF" fontWeight={"bold"} fontSize={"lg"}>
              {post.title}
            </Text>

            <Text
              color="rgba(255, 255, 255, 0.85)"
              fontSize="sm"
              lineHeight="1.4"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="100%"
              wordBreak="break-all"
              overflowWrap="break-word"
              lineClamp={7}
            >
              {getPreviewText(post.content)}
            </Text>
          </VStack>
          <VStack
            alignItems="flex-start"
            gap={1}
            mt="auto"
            width="100%"
            maxW="100%"
            overflow="hidden"
          >
            {post?.author?.name && (
              <Text
                color="#FFF"
                fontSize="sm"
                fontWeight="medium"
                maxW="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {post?.author?.name}
              </Text>
            )}
            {post?.date && (
              <Text
                color="rgba(255,255,255,0.85)"
                fontSize="xs"
                maxW="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {post.date
                  ? new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No date available"}
              </Text>
            )}
          </VStack>
        </VStack>
      </BlogCardWrapper>
    </Link>
  );
};
