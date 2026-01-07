'use client';

import { Box, Flex, Text, Spinner, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LearnSidebar, NavItem } from "morpheus-asia/components/learn-sidebar";
import { TableOfContents } from "morpheus-asia/components/table-of-contents";

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
  Position?: number;
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
  // Sort sections by Position (0 first, then 1, etc.)
  const sortedSections = [...sections].sort((a, b) => {
    const posA = a.Position ?? 999; // If Position is undefined, put at end
    const posB = b.Position ?? 999;
    return posA - posB;
  });

  const navItems: NavItem[] = [];

  sortedSections.forEach((section) => {
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
  const [navItems, setNavItems] = useState<NavItem[]>([]);
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
      <Flex 
        pb="1rem" 
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
        align="center"
        gap="0.5rem"
      >
        {/* Mobile Menu Button */}
        <Box
          as="button"
          aria-label="Toggle sidebar"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          display={{ base: 'flex', lg: 'none' }}
          alignItems="center"
          justifyContent="center"
          bg="transparent"
          color="rgba(255, 255, 255, 0.6)"
          border="none"
          cursor="pointer"
          p="0"
          _hover={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Box>
        <Text
          fontSize="0.875rem"
          color="rgba(255, 255, 255, 0.6)"
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          Documentation
        </Text>
      </Flex>

      {/* Two column layout */}
      <Flex gap="2rem" align="flex-start" position="relative" direction={{ base: 'column', lg: 'row' }}>
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
        <Box display={{ base: 'block', lg: 'none' }} w="100%">
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

        {/* Main Content - uses page scroll */}
        <Box flex="1" minW="0" pt="1.5rem">
          {children}
        </Box>

        {/* Right Column - Table of Contents */}
        <Box
          display={{ base: 'none', xl: 'block' }}
          flexShrink={0}
          w="240px"
          position="sticky"
          top="6rem"
          h="calc(100vh - 12rem)"
          overflowY="auto"
          overflowX="hidden"
          borderLeft="1px solid rgba(255, 255, 255, 0.1)"
          pl="1.5rem"
          className="learn-sidebar-scroll"
        >
          <TableOfContents contentSelector=".doc-content" />
        </Box>
      </Flex>
    </Box>
  );
}
