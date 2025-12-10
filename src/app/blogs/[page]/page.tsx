'use client';

import { Box, Container, Heading, Text, VStack, Grid, Link, HStack, Spinner, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Author {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Tag {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  author: Author;
  featured_image: any;
  tags: Tag[];
  localizations: any[];
}

interface BlogPostsResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { title, date, content, slug, tags, author, summary, featured_image } = post;
  
  // Use summary if available, otherwise extract excerpt from markdown content
  const excerpt = summary || (content.replace(/[#*`]/g, '').slice(0, 200) + '...');
  
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get featured image URL
  const imageUrl = featured_image?.url 
    ? (featured_image.url.startsWith('http') 
        ? featured_image.url 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${featured_image.url}`)
    : null;

  return (
    <Link
      href={`/blog/${slug}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.03)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        overflow="hidden"
        h="100%"
        transition="all 0.3s"
        _hover={{
          bg: "rgba(31, 220, 143, 0.05)",
          borderColor: "#1fdc8f",
          transform: "translateY(-4px)",
        }}
      >
        {/* Featured Image */}
        {imageUrl && (
          <Box
            w="100%"
            h="250px"
            overflow="hidden"
            position="relative"
            bg="rgba(9, 13, 14, 0.3)"
          >
            <Image
              src={imageUrl}
              alt={title}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
        )}

        <Box p="2rem">
          <VStack align="stretch" gap="1rem" h="100%">
            <HStack justify="space-between" flexWrap="wrap" gap="0.5rem">
              {tags && tags.length > 0 && (
                <Box
                  bg="rgba(31, 220, 143, 0.2)"
                  px="0.75rem"
                  py="0.25rem"
                  fontSize="0.75rem"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="#1fdc8f"
                >
                  {tags[0].name}
                </Box>
              )}
              <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)">
                {readTime} min read
              </Text>
            </HStack>

            <Heading
              as="h3"
              fontSize="1.75rem"
              fontWeight="bold"
              color="white"
              lineHeight="1.3"
            >
              {title}
            </Heading>

            <Text
              fontSize="1.125rem"
              lineHeight="1.7"
              color="rgba(255, 255, 255, 0.7)"
              flex="1"
            >
              {excerpt}
            </Text>

            <HStack
              pt="1rem"
              borderTop="1px solid rgba(255, 255, 255, 0.1)"
              justify="space-between"
              flexWrap="wrap"
              gap="0.5rem"
            >
              <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.6)">
                By {author?.name || 'Anonymous'}
              </Text>
              <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)">
                {formattedDate}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Link>
  );
};

export default function BlogsPage() {
  const params = useParams();
  const router = useRouter();
  const currentPage = parseInt(params.page as string) || 1;
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allTags, setAllTags] = useState<string[]>([]);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/blog-posts');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch blog posts');
        }
        
        const data: BlogPostsResponse = await response.json();
        console.log('Fetched blog posts:', data);
        setPosts(data.data);
        
        // Extract unique tags
        const tags = new Set<string>();
        tags.add('All');
        data.data.forEach(post => {
          if (post.tags) {
            post.tags.forEach(tag => {
              tags.add(tag.name);
            });
          }
        });
        setAllTags(Array.from(tags));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load blog posts. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Filter posts by selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => 
        post.tags?.some(tag => tag.name === selectedCategory)
      );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Redirect to page 1 if invalid page number
  useEffect(() => {
    if (!loading && (currentPage < 1 || (totalPages > 0 && currentPage > totalPages))) {
      router.push('/blogs/1');
    }
  }, [currentPage, totalPages, loading, router]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push('/blogs/1');
  };

  const handlePageChange = (page: number) => {
    router.push(`/blogs/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="1200px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap="4rem" align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", sm: "3rem", md: "4rem" }}
              fontWeight="bold"
              mb="1.5rem"
              letterSpacing="0.02em"
            >
              Blog
            </Heading>
            <Text
              fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
              color="rgba(255, 255, 255, 0.8)"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
              px={{ base: "1rem", md: "0" }}
            >
              Insights, tutorials, and updates from the Morpheus Asia community. 
              Stay informed about the latest developments in decentralized AI.
            </Text>
          </Box>

          {/* Category Filter */}
          {!loading && allTags.length > 0 && (
            <Box>
              <HStack
                gap={{ base: "0.5rem", md: "1rem" }}
                justify="center"
                flexWrap="wrap"
                pb="2rem"
                borderBottom="1px solid rgba(255, 255, 255, 0.1)"
              >
                {allTags.map((category, index) => (
                  <Box
                    key={index}
                    as="button"
                    px={{ base: "1rem", md: "1.5rem" }}
                    py="0.5rem"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    color={selectedCategory === category ? "black" : "white"}
                    bg={selectedCategory === category ? "#1fdc8f" : "transparent"}
                    border="1px solid"
                    borderColor={selectedCategory === category ? "#1fdc8f" : "rgba(255, 255, 255, 0.3)"}
                    transition="all 0.2s"
                    onClick={() => handleCategoryChange(category)}
                    _hover={{
                      bg: selectedCategory === category ? "#18c57d" : "rgba(31, 220, 143, 0.1)",
                      borderColor: "#1fdc8f",
                    }}
                  >
                    {category}
                  </Box>
                ))}
              </HStack>
            </Box>
          )}

          {/* Loading State */}
          {loading && (
            <Box textAlign="center" py="4rem">
              <Spinner size="xl" color="#1fdc8f" />
              <Text mt="1rem" fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
                Loading blog posts...
              </Text>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box
              textAlign="center"
              py="4rem"
              bg="rgba(255, 0, 0, 0.1)"
              border="1px solid rgba(255, 0, 0, 0.3)"
              borderRadius="8px"
            >
              <Text fontSize="1.25rem" color="rgba(255, 255, 255, 0.9)">
                {error}
              </Text>
            </Box>
          )}

          {/* Blog Posts Grid */}
          {!loading && !error && currentPosts.length > 0 && (
            <>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="2rem"
              >
                {currentPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <HStack justify="center" gap={{ base: "0.25rem", sm: "0.5rem" }} mt="2rem" flexWrap="wrap">
                  <Box
                    as="button"
                    px={{ base: "0.75rem", md: "1rem" }}
                    py="0.5rem"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    color="white"
                    bg="transparent"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.3)"
                    transition="all 0.2s"
                    onClick={() => handlePageChange(currentPage - 1)}
                    opacity={currentPage === 1 ? 0.5 : 1}
                    cursor={currentPage === 1 ? "not-allowed" : "pointer"}
                    pointerEvents={currentPage === 1 ? "none" : "auto"}
                    _hover={currentPage === 1 ? {} : {
                      bg: "rgba(31, 220, 143, 0.1)",
                      borderColor: "#1fdc8f",
                    }}
                  >
                    ← Prev
                  </Box>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Box
                      key={page}
                      as="button"
                      px={{ base: "0.75rem", md: "1rem" }}
                      py="0.5rem"
                      fontSize={{ base: "0.875rem", md: "1rem" }}
                      fontWeight="bold"
                      color={currentPage === page ? "black" : "white"}
                      bg={currentPage === page ? "#1fdc8f" : "transparent"}
                      border="1px solid"
                      borderColor={currentPage === page ? "#1fdc8f" : "rgba(255, 255, 255, 0.3)"}
                      transition="all 0.2s"
                      onClick={() => handlePageChange(page)}
                      _hover={{
                        bg: currentPage === page ? "#18c57d" : "rgba(31, 220, 143, 0.1)",
                        borderColor: "#1fdc8f",
                      }}
                    >
                      {page}
                    </Box>
                  ))}

                  <Box
                    as="button"
                    px={{ base: "0.75rem", md: "1rem" }}
                    py="0.5rem"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight="bold"
                    color="white"
                    bg="transparent"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.3)"
                    transition="all 0.2s"
                    onClick={() => handlePageChange(currentPage + 1)}
                    opacity={currentPage === totalPages ? 0.5 : 1}
                    cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
                    pointerEvents={currentPage === totalPages ? "none" : "auto"}
                    _hover={currentPage === totalPages ? {} : {
                      bg: "rgba(31, 220, 143, 0.1)",
                      borderColor: "#1fdc8f",
                    }}
                  >
                    Next →
                  </Box>
                </HStack>
              )}
            </>
          )}

          {/* No Posts State */}
          {!loading && !error && filteredPosts.length === 0 && (
            <Box textAlign="center" py="4rem">
              <Text fontSize="1.5rem" color="rgba(255, 255, 255, 0.7)">
                No blog posts found{selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}.
              </Text>
            </Box>
          )}

          {/* Newsletter Subscription */}
          <Box
            bg="rgba(31, 220, 143, 0.1)"
            border="2px solid #1fdc8f"
            p={{ base: "1.5rem", md: "3rem" }}
            textAlign="center"
            mt="2rem"
          >
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              fontWeight="bold"
              mb="1.5rem"
            >
              Stay Updated
            </Heading>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              mb="2rem"
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.7"
              maxW="700px"
              mx="auto"
            >
              Join our community channels to never miss an update. Get the latest articles, 
              announcements, and insights delivered directly to you.
            </Text>
            <HStack gap={{ base: "0.75rem", md: "1rem" }} justify="center" flexWrap="wrap">
              <Link href="https://t.me/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "1rem", md: "1.25rem" }}
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Join Telegram
                </Box>
              </Link>
              <Link href="https://twitter.com/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "1rem", md: "1.25rem" }}
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Follow on X
                </Box>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
