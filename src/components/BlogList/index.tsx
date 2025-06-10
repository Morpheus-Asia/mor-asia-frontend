"use client";

import { Box, Grid, GridItem, Text, VStack, Input, Button, HStack, Image, IconButton, Menu, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDictionary } from "morpheus-asia/i18n";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { LuSearch } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

type Props = {
  locale?: string;
  limit?: number;
  hideSearch?: boolean;
  hideTags?: boolean;
  hidePagination?: boolean;
  hideResultsInfo?: boolean;
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
  slug: string;
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
  
  // Remove markdown images and links first
  let cleanText = body.replace(/!\[.*?\]\(.*?\)/g, '');
  cleanText = cleanText.replace(/\[.*?\]\(.*?\)/g, '');
  cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, '');
  cleanText = cleanText.replace(/#{1,6}\s/g, ''); // Remove markdown headers
  cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown
  cleanText = cleanText.replace(/\*(.*?)\*/g, '$1'); // Remove italic markdown
  
  // Remove extra whitespace and newlines
  cleanText = cleanText.replace(/\s+/g, ' ').trim();
  
  // Split into words
  const words = cleanText.split(' ');
  const maxLines = 2;
  const wordsPerLine = 8; // Approximate words per line
  const maxWords = maxLines * wordsPerLine;
  
  if (words.length <= maxWords) return cleanText;
  
  // Take only the words that fit in maxLines
  const truncated = words.slice(0, maxWords).join(' ');
  return truncated + '...';
};

// Helper function to truncate title
const getTruncatedTitle = (title: string): string => {
  if (!title) return 'Untitled';
  const maxLength = 60;
  if (title.length <= maxLength) return title;
  
  const truncated = title.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 30 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const BlogList: React.FC<Props> = (props) => {
  const { locale, limit, hideSearch, hideTags, hidePagination, hideResultsInfo } = props;
  // =============== LOCALE
  const blogPageLocale = getDictionary(locale)?.blogPage;

  // =============== STATE
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // =============== PAGINATION CONFIG
  const POSTS_PER_PAGE = limit || 9;

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

  // Reset to page 1 when search or tag changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // =============== UTILS
  const allTags = Array.from(new Set(posts.flatMap(post => 
    post.Tags ? post.Tags.split(',').map(tag => tag.trim()) : []
  ))).filter(Boolean); // Filter out any empty tags
  
  // Sort posts by date when no tag is selected
  const sortedPosts = [...posts].sort((a, b) => {
    if (!selectedTag) {
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    }
    return 0;
  });
  
  // Filter posts based on search and tag
  const filteredPosts = sortedPosts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = post.Title.toLowerCase().includes(searchLower) ||
                         post.Body.toLowerCase().includes(searchLower);
    const matchesTag = !selectedTag || (post.Tags && post.Tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // =============== PAGINATION HANDLERS
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(currentPage - halfVisible, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };
  
  // =============== VIEWS
  return (
    <VStack width={"100%"} alignItems={"center"} gap={6} py={4}>
      {/* Search Bar */}
      {!hideSearch && (
        <Box width="100%" maxW="500px" position="relative">
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
      )}

      {/* Tags */}
      {!hideTags && (
        <VStack width="100%" maxW="800px" gap={4}>
          <HStack gap={4} width="100%" justify="center">
            <Button
              size="sm"
              onClick={() => setSelectedTag(null)}
              bg={selectedTag === null ? "#2D6748" : "#1C4532"}
              color="white"
              borderRadius="full"
              _hover={{ bg: selectedTag === null ? "#2D6748" : "#234A38" }}
              textTransform="uppercase"
              fontWeight="normal"
            >
              Latest
            </Button>
            {allTags.slice(0, 3).map((tag) => (
              <Button
                key={tag}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                bg={selectedTag === tag ? "#2D6748" : "#1C4532"}
                color="white"
                borderRadius="full"
                _hover={{ bg: selectedTag === tag ? "#2D6748" : "#234A38" }}
                textTransform="uppercase"
                fontWeight="normal"
              >
                {tag}
              </Button>
            ))}
          </HStack>
          
          <HStack gap={4} width="100%" justify="center">
            {allTags.slice(3, 6).map((tag) => (
              <Button
                key={tag}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                bg={selectedTag === tag ? "#2D6748" : "#1C4532"}
                color="white"
                borderRadius="full"
                _hover={{ bg: selectedTag === tag ? "#2D6748" : "#234A38" }}
                textTransform="uppercase"
                fontWeight="normal"
              >
                {tag}
              </Button>
            ))}
            {allTags.length > 6 && (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button
                    size="sm"
                    bg="#1C4532"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: "#234A38" }}
                    textTransform="uppercase"
                    fontWeight="normal"
                    px={6}
                  >
                    More <FaChevronDown style={{ marginLeft: 8, fontSize: 16 }} />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      bg="#1C4532"
                      borderRadius="md"
                      boxShadow="md"
                      py={2}
                      minW="120px"
                      zIndex={20}
                    >
                      {allTags.slice(6).map((tag) => (
                        <Menu.Item
                          key={tag}
                          value={tag}
                          onSelect={() => setSelectedTag(tag)}
                          style={{
                            background: selectedTag === tag ? "#2D6748" : "#1C4532",
                            color: "white",
                            borderRadius: "9999px",
                            textTransform: "uppercase",
                            fontWeight: "normal",
                            width: "100%",
                            justifyContent: "flex-start",
                            padding: "0.5rem 1rem",
                            margin: 0,
                            cursor: "pointer",
                          }}
                          _hover={{ background: "#234A38" }}
                        >
                          {tag}
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
          </HStack>
        </VStack>
      )}

      {/* Results Info */}
      {!hideResultsInfo && filteredPosts.length > 0 && (
        <Text color="rgba(255,255,255,0.7)" fontSize="sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
        </Text>
      )}

      {/* Blog Grid */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        width="100%"
        minH="400px"
        maxW="100%"
      >
        {currentPosts.map((post) => (
          <GridItem key={post.id} width="100%" maxW="100%" overflow="hidden">
            <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <Box
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
                    flexShrink={0}
                  />
                )}
                <VStack alignItems="flex-start" gap={3} p={6} flex="1" justify="space-between" overflow="hidden" maxW="100%">
                  <VStack alignItems="flex-start" gap={3} flex="1" overflow="hidden" maxW="100%">
                    <Text 
                      color="#FFF" 
                      fontWeight={"bold"} 
                      fontSize={"lg"}
                      lineHeight="1.3"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      maxW="100%"
                      wordBreak="break-all"
                      overflowWrap="break-word"
                    >
                      {getTruncatedTitle(post.Title)}
                    </Text>
                    <Text 
                      color="#FFF" 
                      fontSize="sm"
                      lineHeight="1.4"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      maxW="100%"
                      wordBreak="break-all"
                      overflowWrap="break-word"
                      lineClamp={7}
                    >
                      {getPreviewText(post.Body)}
                    </Text>
                  </VStack>
                  <VStack alignItems="flex-start" gap={1} mt="auto" width="100%" maxW="100%" overflow="hidden">
                    <Text color="#FFF" fontSize="sm" fontWeight="medium" maxW="100%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      {post.author?.Name || 'Unknown'}
                    </Text>
                    <Text color="rgba(255,255,255,0.5)" fontSize="xs" maxW="100%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
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

      {/* No Results Message */}
      {filteredPosts.length === 0 && !loading && (
        <VStack gap={4} py={8}>
          <Text color="rgba(255,255,255,0.7)" fontSize="lg" textAlign="center">
            No blog posts found
          </Text>
          <Text color="rgba(255,255,255,0.5)" fontSize="sm" textAlign="center">
            Try adjusting your search terms or selected tags
          </Text>
        </VStack>
      )}

      {/* Pagination Controls */}
      {!hidePagination && totalPages > 1 && (
        <VStack gap={4} py={4}>
          <HStack gap={6} justify="center" align="center">
            {/* Previous Button */}
            <IconButton
              aria-label="Previous page"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              bg="transparent"
              color="white"
              _hover={{ color: "rgba(255,255,255,0.8)" }}
              _disabled={{ 
                color: "rgba(255,255,255,0.3)",
                cursor: "not-allowed"
              }}
              size="lg"
            >
              <FaChevronLeft size={80} />
            </IconButton>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                bg={currentPage === pageNum ? "#20DC8E" : "transparent"}
                color="white"
                _hover={{ bg: currentPage === pageNum ? "#20DC8E" : "rgba(255,255,255,0.1)" }}
                size="sm"
                w="30px"
                h="30px"
                minW="20px"
                fontSize="lg"
                borderRadius="full"
                p={0}
              >
                {pageNum}
              </Button>
            ))}

            {/* Next Button */}
            <IconButton
              aria-label="Next page"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              bg="transparent"
              color="white"
              _hover={{ color: "rgba(255,255,255,0.8)" }}
              _disabled={{ 
                color: "rgba(255,255,255,0.3)",
                cursor: "not-allowed"
              }}
              size="lg"
            >
              <FaChevronRight size={80} />
            </IconButton>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default BlogList; 