import { Box, VStack } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import BlogContainer from "morpheus-asia/containers/BlogContainer";

export type BlogPageProps = {
  locale?: string;
  blogPage?: {
    heading: string;
  };
  title?: string;
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const BlogScreen: React.FC<BlogPageProps> = (props) => {
  const { locale, blogPage, title } = props;

  // =============== VIEWS
  return (
    <>
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"}>
        <VStack gap={5} width="100%">
          <Box width="100%">
            <BlogContainer locale={locale} blogPage={blogPage} title={title} />
          </Box>
        </VStack>
      </ContainerWrapper>
    </>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default BlogScreen;
