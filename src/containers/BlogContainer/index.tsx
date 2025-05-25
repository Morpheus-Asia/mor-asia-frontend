"use client";

import { Box, Grid, GridItem, Text, VStack, Input, Button, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDictionary } from "morpheus-asia/i18n";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { LuSearch } from "react-icons/lu";

type Props = {
  locale?: string;
};

type BlogPost = {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Body: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  Date: string;
  Author: string;
  Tags: string;
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const BlogContainer: React.FC<Props> = (props) => {
  const { locale } = props;
  // =============== LOCALE
  const blogPageLocale = getDictionary(locale)?.blogPage;

  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // =============== EFFECTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchContentType(
          "blog-posts",
          {
            filters: { locale }
          }
        );
        setPosts(response?.data || []);
      } catch (error) {
        console.error("BlogContainerError", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [locale]);

  // =============== UTILS
  const allTags = Array.from(new Set(posts.flatMap(post => post.Tags.split(',').map(tag => tag.trim()))));
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.Body[0]?.children[0]?.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.Tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // =============== VIEWS
  return (
    <Box width="100%" px={{ base: 0, md: 6 }}>
      <VStack width={"100%"} alignItems={"center"} gap={6} py={4}>
        {/* Title */}
        <Text color="#FFF" fontWeight={"bold"} fontSize={"3xl"} textAlign="center">
          {blogPageLocale?.heading || 'DISCOVER OUR LATEST BLOG'}
        </Text>

        {/* Search Bar */}
        <Box width="100%" maxW="600px" position="relative">
          <Box position="absolute" left={4} top="50%" transform="translateY(-50%)" zIndex={1}>
            <LuSearch color="rgba(255,255,255,0.7)" size={20} />
          </Box>
          <Input
            placeholder="Search Blog"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="#1C4532"
            color="white"
            _placeholder={{ color: 'rgba(255,255,255,0.7)' }}
            border="none"
            _hover={{ bg: "#1C4532" }}
            _focus={{ bg: "#1C4532" }}
            pl={12}
          />
        </Box>

        {/* Tags */}
        <Stack direction="row" gap={4} flexWrap="wrap" justifyContent="center">
          <Button
            size="sm"
            onClick={() => setSelectedTag(null)}
            bg="#1C4532"
            color="white"
            borderRadius="full"
            _hover={{ bg: "#1C4532" }}
          >
            {blogPageLocale?.allTags || 'All'}
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              bg="#1C4532"
              color="white"
              borderRadius="full"
              _hover={{ bg: "#1C4532" }}
            >
              {tag}
            </Button>
          ))}
        </Stack>

        {/* Blog Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={6}
          width="100%"
        >
          {filteredPosts.map((post) => (
            <GridItem key={post.id}>
              <Box
                background="rgba(255,255,255,0.05)"
                borderRadius={8}
                p={6}
                height="100%"
                transition="all 0.2s"
                _hover={{
                  background: "rgba(255,255,255,0.08)",
                  transform: "translateY(-2px)",
                }}
              >
                <VStack alignItems="flex-start" gap={3}>
                  <Text color="#FFF" fontWeight={"bold"} fontSize={"lg"}>
                    {post.Title || 'Untitled'}
                  </Text>
                  <Text color="#FFF" fontSize="sm">
                    {post.Body?.[0]?.children?.[0]?.text || 'No content available'}
                  </Text>
                  <VStack alignItems="flex-start" gap={0} mt="auto">
                    <Text color="#FFF" fontSize="sm">
                      {post.Author || 'Unknown'}
                    </Text>
                    <Text color="rgba(255,255,255,0.5)" fontSize="xs">
                      {post.Date ? new Date(post.Date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'No date available'}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default BlogContainer; 