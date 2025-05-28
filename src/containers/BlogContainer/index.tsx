"use client";

import { Box, Grid, GridItem, Text, VStack, Input, Button, Stack, HStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDictionary } from "morpheus-asia/i18n";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

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
  Body: string;
  Date: string;
  author: {
    id: number;
    Name: string;
  };
  Tags: string;
  Featured_Image?: {
    formats: {
      small: {
        url: string;
      };
    };
  };
};

// Helper function to get preview text
const getPreviewText = (body: string): string => {
  if (!body) return 'No content available';
  const imgIdx = body.search(/!\[.*?\]\(.*?\)/);
  const linkIdx = body.search(/https?:\/\/|www\./);
  let cutIdx = 150;
  if (imgIdx !== -1 && imgIdx < cutIdx) cutIdx = imgIdx;
  if (linkIdx !== -1 && linkIdx < cutIdx) cutIdx = linkIdx;
  const preview = body.slice(0, cutIdx);
  return preview.length < body.length ? preview + '...' : preview;
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
            filters: { locale },
            populate: {
              author: {
                populate: ['Avatar']
              },
              Featured_Image: true
            }
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
          {posts.filter(post => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = post.Title.toLowerCase().includes(searchLower) ||
                                 post.Body.toLowerCase().includes(searchLower);
            const matchesTag = !selectedTag || post.Tags.includes(selectedTag);
            return matchesSearch && matchesTag;
          }).map((post) => (
            <GridItem key={post.id}>
              <Link href={`/${locale}/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                <Box
                  background="rgba(255,255,255,0.05)"
                  borderRadius={8}
                  overflow="hidden"
                  height="100%"
                  transition="all 0.2s"
                  _hover={{
                    background: "rgba(255,255,255,0.08)",
                    transform: "translateY(-2px)",
                  }}
                >
                  {post.Featured_Image?.formats?.small?.url && (
                    <Image
                      src={post.Featured_Image.formats.small.url}
                      alt={post.Title}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                    />
                  )}
                  <VStack alignItems="flex-start" gap={3} p={6}>
                    <Text color="#FFF" fontWeight={"bold"} fontSize={"lg"}>
                      {post.Title || 'Untitled'}
                    </Text>
                    <Text color="#FFF" fontSize="sm">
                      {getPreviewText(post.Body)}
                    </Text>
                    <VStack alignItems="flex-start" gap={0} mt="auto">
                      <Text color="#FFF" fontSize="sm">
                        {post.author?.Name || 'Unknown'}
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
              </Link>
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