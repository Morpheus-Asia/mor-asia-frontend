'use client';

import { Box, Flex, Button, Text, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LearnSidebar, NavItem } from "morpheus-asia/components/learn-sidebar";

interface LearnLayoutClientProps {
  children: React.ReactNode;
  navItems?: NavItem[];
}

export function LearnLayoutClient({ children, navItems }: LearnLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          <LearnSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
        </Box>

        {/* Mobile Sidebar */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <LearnSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
        </Box>

        {/* Main Content - uses page scroll */}
        <Box flex="1" maxW={{ base: "100%", lg: "calc(100% - 300px)" }}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
