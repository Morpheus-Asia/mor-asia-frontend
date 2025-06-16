import React from 'react';
import { Box, Container, Heading, Link } from '@chakra-ui/react';
import { BlogList } from '../../components/BlogList';
import NextLink from 'next/link';
import { getDictionary } from "morpheus-asia/i18n";

interface BlogHomeProps {
  title: string;
  locale: string;
}

const BlogHome: React.FC<BlogHomeProps> = ({ title, locale }) => {
  const blogLocale = getDictionary(locale)?.blog;

  return (
    <Box 
      as="section" 
      py={16}
    >
      <Container maxW="container.xl">
        <Heading 
          as="h2" 
          textAlign="center" 
          mb={12}
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="white"
        >
          {title}
        </Heading>
        <Box maxW="1200px" mx="auto">
          <BlogList 
            locale={locale} 
            limit={3} 
            hideSearch={true}
            hideTags={true}
            hidePagination={true}
            hideResultsInfo={true}
          />
        </Box>
        <Box textAlign="center" mt={8}>
          <Link
            as={NextLink}
            href={`/${locale}/blog`}
            color="#20DC8E"
            fontSize="lg"
            fontWeight="medium"
            textDecoration="underline"
            textDecorationColor="#20DC8E"
            textUnderlineOffset="4px"
            _hover={{
              textDecoration: "underline",
              textDecorationColor: "#20DC8E"
            }}
          >
            {blogLocale?.seeMore}
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogHome; 