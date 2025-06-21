import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { BlogPost } from "morpheus-asia/@types/blog";
import { map, size, times } from "lodash";
import { SkeletonBlogCard } from "morpheus-asia/components/BlogCard/Skeleton";
import { BlogCard } from "morpheus-asia/components/BlogCard";
import ContainerWrapper from "../ContainerWrapper";

interface BlogHomeProps {
  title: string;
  locale: string;
  seeMoreLink?: {
    url: string;
    text: string;
    target?: string;
  };
}

const BlogHome: React.FC<BlogHomeProps> = ({ title, locale, seeMoreLink }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchContentType("blog-posts", {
          filters: { locale },
          sort: ["createdAt:desc"],
          pagination: {
            page: 1,
            pageSize: 3,
          },
          populate: {
            author: {
              populate: ["avatar"],
            },
            tags: {
              fields: ["name"],
            },
            featured_image: true,
          },
        });
        const postsData = response?.data.map((postData: BlogPost) => ({
          ...postData,
          tags: postData.tags?.map((tag: { name: string }) => tag.name) || [],
        }));
        setPosts(postsData || []);
      } catch (error) {
        console.error("BlogPostsFetchError", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [locale]);

  const renderPosts = () => {
    if (loadingPosts) {
      return times(3, (index) => <SkeletonBlogCard key={index} />);
    }
    if (size(posts) === 0) {
      return (
        <GridItem
          width={"100%"}
          justifyItems={"center"}
          alignItems={"center"}
          gridColumn="1 / -1"
        >
          <VStack gap={4} py={8}>
            {/** @TODO translation */}
            <Text
              color="rgba(255,255,255,0.7)"
              fontSize="lg"
              textAlign="center"
            >
              No blog posts found
            </Text>
            <Text
              color="rgba(255,255,255,0.5)"
              fontSize="sm"
              textAlign="center"
            >
              Try adjusting your search terms or selected tags
            </Text>
          </VStack>
        </GridItem>
      );
    }
    return map(posts, (post) => (
      <GridItem key={post.id} width="100%" maxW="100%" overflow="hidden">
        <BlogCard post={post} locale={locale || ""} />
      </GridItem>
    ));
  };

  return (
    <ContainerWrapper>
      <Heading
        as="h2"
        textAlign="center"
        mb={12}
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        color="white"
      >
        {title}
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        width="100%"
      >
        {renderPosts()}
      </Grid>
      {seeMoreLink?.url && (
        <Stack
          width="100%"
          justifyContent={"center"}
          alignItems="center"
          mt={8}
        >
          <Link
            href={seeMoreLink?.url}
            color="primary.600"
            variant={"underline"}
            textDecorationThickness={2}
            textUnderlineOffset={4.5}
          >
            {seeMoreLink?.text}
          </Link>
        </Stack>
      )}
    </ContainerWrapper>
  );
};

export default BlogHome;
