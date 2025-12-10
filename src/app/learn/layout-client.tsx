'use client';

import { Box, Flex, Button, Text, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LearnSidebar, NavItem } from "morpheus-asia/components/learn-sidebar";

interface Doc {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DocSection {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  docs?: Doc[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DocSectionsResponse {
  data: DocSection[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Transform Strapi doc sections to nav items
function transformToNavItems(sections: DocSection[]): NavItem[] {
  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      href: '/learn',
    },
  ];

  sections.forEach((section) => {
    const sectionItem: NavItem = {
      id: section.Slug || section.documentId,
      label: section.Title,
      href: `/learn/${section.Slug}`,
    };

    // Add child docs if they exist
    if (section.docs && section.docs.length > 0) {
      sectionItem.children = section.docs.map((doc) => ({
        id: doc.Slug || doc.documentId,
        label: doc.Title,
        href: `/learn/${section.Slug}/${doc.Slug}`,
      }));
    }

    navItems.push(sectionItem);
  });

  return navItems;
}

interface LearnLayoutClientProps {
  children: React.ReactNode;
}

export function LearnLayoutClient({ children }: LearnLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: 'overview',
      label: 'Overview',
      href: '/learn',
    },
  ]);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchNavItems() {
      try {
        setSidebarLoading(true);
        const response = await fetch('/api/doc-sections');
        
        if (!response.ok) {
          throw new Error('Failed to fetch navigation');
        }
        
        const data: DocSectionsResponse = await response.json();
        if (data.data) {
          setNavItems(transformToNavItems(data.data));
        }
      } catch (err) {
        console.error('Error fetching nav items:', err);
        // Keep default nav items on error
      } finally {
        setSidebarLoading(false);
      }
    }

    fetchNavItems();
  }, []);

  return (
    <Box>
      {/* Header with Documentation title */}
      <Box pb="1rem" mb="1.5rem" borderBottom="1px solid rgba(255, 255, 255, 0.1)">
        <HStack gap="0.75rem" align="center">
          {/* Mobile Menu Button */}
          <Button
            aria-label="Toggle sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            display={{ base: 'flex', lg: 'none' }}
            bg="transparent"
            color="rgba(255, 255, 255, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="6px"
            minW="auto"
            h="auto"
            px="0.5rem"
            py="0.35rem"
            fontSize="0.875rem"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            ☰
          </Button>
          <Text
            fontSize="0.875rem"
            color="rgba(255, 255, 255, 0.6)"
            textTransform="uppercase"
            letterSpacing="0.05em"
          >
            Documentation
          </Text>
        </HStack>
      </Box>

      {/* Two column layout */}
      <Flex gap="2rem" align="flex-start" position="relative">
        {/* Desktop Sidebar - sticky with its own scroll */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          flexShrink={0}
          w="280px"
          position="sticky"
          top="6rem"
          h="calc(100vh - 12rem)"
          overflowY="auto"
          overflowX="hidden"
          borderRight="1px solid rgba(255, 255, 255, 0.1)"
          className="learn-sidebar-scroll"
        >
          {sidebarLoading ? (
            <VStack py="2rem" gap="1rem">
              <Spinner size="md" color="#1fdc8f" />
              <Text fontSize="0.875rem" color="rgba(255, 255, 255, 0.5)">
                Loading...
              </Text>
            </VStack>
          ) : (
            <LearnSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
          )}
        </Box>

        {/* Mobile Sidebar */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <LearnSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
        </Box>

        {/* Main Content - uses page scroll */}
        <Box flex="1" minW="0">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
