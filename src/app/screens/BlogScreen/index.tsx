import { Box, Text, VStack } from "@chakra-ui/react";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import BlogContainer from "morpheus-asia/containers/BlogContainer";

export type BlogPageProps = {
  locale?: string;
  blogPage: {
    heading: string;
    subHeading: string;
  };
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const BlogScreen: React.FC<BlogPageProps> = (props) => {
  const { locale, blogPage } = props;

  // =============== VIEWS
  return (
    <>
      <ContainerWrapper pt={"8rem"} width={"100%"} pb={"3.5rem"}>
        <VStack gap={5} width="100%">
          <VStack justifyContent={"center"} alignItems={"center"}>
            <Text color="#FFF" fontWeight={"bold"} fontSize={"4xl"}>
              {blogPage.heading}
            </Text>
            <Text color="rgba(255, 255, 255, 0.75)" fontSize={"lg"}>
              {blogPage.subHeading}
            </Text>
          </VStack>
          <Box width="100%">
            <BlogContainer locale={locale} />
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