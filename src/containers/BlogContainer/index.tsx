"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import BlogList from "morpheus-asia/components/BlogList";

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
  const { locale, blogPage } = props;

  // =============== VIEWS
  return (
    <Box width="100%" px={{ base: 0, md: 6 }}>
      <VStack width={"100%"} alignItems={"center"} gap={6} py={4}>
        {/* Title */}
        <Text color="#FFF" fontWeight={"bold"} fontSize={"3xl"} textAlign="center">
          {'DISCOVER OUR LATEST BLOG'}
        </Text>

        {/* Blog List */}
        <BlogList locale={locale} />
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