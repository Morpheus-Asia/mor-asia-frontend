import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { BlogList } from '../../components/BlogList';
import NextLink from 'next/link';

interface BlogHomeProps {
  title: string;
  locale: string;
}

const BlogHome: React.FC<BlogHomeProps> = ({ title, locale }) => {
  return (
    <Box 
      as="section" 
      py={16}
      style={{
        animation: 'fadeIn 0.8s ease-out forwards',
        opacity: 0
      }}
    >
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
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
          <NextLink 
            href={`/${locale}/blog`}
            style={{
              color: '#20DC8E',
              fontSize: '1.125rem',
              fontWeight: 500,
              textDecoration: 'underline',
              textDecorationColor: '#20DC8E',
              textUnderlineOffset: '4px'
            }}
          >
            See more
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogHome; 