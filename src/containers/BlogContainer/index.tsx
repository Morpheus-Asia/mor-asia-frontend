"use client";

import {
  Grid,
  GridItem,
  Text,
  VStack,
  Input,
  Button,
  Stack,
  HStack,
  IconButton,
  InputGroup,
  Wrap,
  WrapItem,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDictionary } from "morpheus-asia/i18n";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { LuSearch } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FilterButton } from "morpheus-asia/components/FilterButton";
import { FilterMoreDropdown } from "morpheus-asia/components/FilterMoreDropdown";
import { map, size, times } from "lodash";
import { BlogCard } from "morpheus-asia/components/BlogCard";
import { SkeletonBlogCard } from "morpheus-asia/components/BlogCard/Skeleton";
import { BlogPost } from "morpheus-asia/@types/blog";

type Props = {
  locale?: string;
  blogPage?: {
    heading: string;
  };
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
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // =============== PAGINATION CONFIG
  const POSTS_PER_PAGE = 9;

  // =============== EFFECTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchContentType("blog-posts", {
          filters: { locale },
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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetchContentType("tags", {
          filters: { locale },
        });
        const tags =
          response?.data?.map((tag: { name: string }) => tag.name) || [];
        setTags(tags || []);
      } catch (error) {
        console.error("TagsFetchError", error);
      } finally {
        setLoadingTags(false);
      }
    };

    fetchTags();
  }, [locale]);

  // Reset to page 1 when search or tag changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // =============== UTILS

  // Sort posts by date when no tag is selected
  const sortedPosts = [...posts].sort((a, b) => {
    if (!selectedTag) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  }) as BlogPost[];

  // Filter posts based on search and tag
  const filteredPosts = sortedPosts.filter((post) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      post?.title?.toLowerCase().includes(searchLower) ||
      post?.content?.toLowerCase().includes(searchLower);
    const matchesTag =
      !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const visibleTags = tags.slice(0, 6);
  const moreTags = tags.slice(6);
  const hasMoreTags = size(tags) > 6;

  // =============== PAGINATION HANDLERS
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
      const end = Math.min(start + maxVisiblePages - 1, totalPages);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const onHandleSelectTag = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const renderTop = () => {
    return (
      <>
        {/* Title */}
        <Text
          color="#FFF"
          fontWeight={"bold"}
          fontSize={"4xl"}
          textAlign="center"
        >
          {blogPageLocale?.title}
        </Text>

        {/* Search Bar */}
        <Stack width={"50%"}>
          <InputGroup startElement={<LuSearch color="#B8B8B8" size={20} />}>
            <Input
              placeholder="Search Blog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="primary.400"
              borderRadius={10}
              color="white"
              _placeholder={{ color: "#B8B8B8" }}
              border="none"
              size={"xl"}
            />
          </InputGroup>
        </Stack>
      </>
    );
  };

  const renderTags = () => {
    return (
      <Wrap gap={3} justify={"center"} maxW={"50%"}>
        <WrapItem>
          <FilterButton onClick={() => onHandleSelectTag(null)}>
            ALL
          </FilterButton>
        </WrapItem>
        {map(visibleTags, (tag) => (
          <WrapItem key={tag}>
            <FilterButton onClick={() => onHandleSelectTag(tag)}>
              {tag}
            </FilterButton>
          </WrapItem>
        ))}
        {hasMoreTags && (
          <FilterMoreDropdown
            tags={moreTags}
            onHandleClick={onHandleSelectTag}
          />
        )}
      </Wrap>
    );
  };

  const renderPosts = () => {
    if (loadingPosts) {
      return times(3, (index) => <SkeletonBlogCard key={index} />);
    }
    if (size(filteredPosts) === 0) {
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
    return map(currentPosts, (post) => (
      <GridItem key={post.id} width="100%" maxW="100%" overflow="hidden">
        <BlogCard post={post} locale={locale || ""} />
      </GridItem>
    ));
  };

  const renderResultInfo = () => {
    if (loadingTags || loadingPosts)
      return (
        <SkeletonText w={"8rem"} height={6} noOfLines={1} margin="0 auto" />
      );

    return (
      filteredPosts.length > 0 && (
        <Text color="rgba(255,255,255,0.7)" fontSize="sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of{" "}
          {filteredPosts.length} posts
        </Text>
      )
    );
  };

  // =============== VIEWS
  return (
    <VStack
      width={"100%"}
      alignItems={"center"}
      gap={7}
      py={4}
      height={"100vh"}
    >
      {renderTop()}
      {renderTags()}

      {/* Results Info */}
      {renderResultInfo()}

      {/* Blog Grid */}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
                cursor: "not-allowed",
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
                _hover={{
                  bg:
                    currentPage === pageNum
                      ? "#20DC8E"
                      : "rgba(255,255,255,0.1)",
                }}
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
                cursor: "not-allowed",
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
export default BlogContainer;
