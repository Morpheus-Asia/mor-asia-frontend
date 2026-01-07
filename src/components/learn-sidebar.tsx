'use client';

import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

// Default static nav items as fallback
const defaultNavItems: NavItem[] = [];

interface LearnSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItem[];
}

export function LearnSidebar({ isOpen, onClose, navItems = defaultNavItems }: LearnSidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setTimeout(() => onClose(), 100);
    }
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <Box key={item.id} w="100%">
        {/* Section header - non-clickable if it has children, clickable if it doesn't */}
        {hasChildren ? (
          // Section title (non-clickable)
          <Box
            w="100%"
            py="0.75rem"
            pl="1rem"
            mt="0.5rem"
            mb="0.25rem"
          >
            <Text
              fontSize="0.875rem"
              fontWeight="600"
              color="rgba(255, 255, 255, 0.6)"
              textTransform="uppercase"
              letterSpacing="0.05em"
              textAlign="left"
              lineHeight="1.6"
              wordBreak="break-word"
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
            >
              {item.label}
            </Text>
          </Box>
        ) : (
          // Clickable link (for items without children like Overview or individual docs)
          <Link href={item.href} onClick={handleLinkClick} style={{ textDecoration: 'none' }}>
            <HStack
              w="100%"
              py="0.5rem"
              pl="1rem"
              pr="0.5rem"
              borderRadius="0"
              transition="all 0.2s"
              align="flex-start"
              _hover={{
                bg: "rgba(31, 220, 143, 0.1)",
              }}
              bg={isActive ? "rgba(31, 220, 143, 0.15)" : "transparent"}
              borderLeft={isActive ? "3px solid #1fdc8f" : "3px solid transparent"}
              cursor="pointer"
            >
              <Text
                fontSize="0.9375rem"
                fontWeight="bold"
                color={isActive ? "#1fdc8f" : "rgba(255, 255, 255, 0.9)"}
                textAlign="left"
                lineHeight="1.6"
                wordBreak="break-word"
                fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              >
                {item.label}
              </Text>
            </HStack>
          </Link>
        )}

        {/* Always show children (no collapse) */}
        {hasChildren && (
          <VStack align="stretch" mt="0.25rem" gap="0.25rem">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </VStack>
        )}
      </Box>
    );
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <Box display={{ base: 'block', lg: 'none' }} w="100%" mb="1rem">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              style={{
                overflow: 'hidden',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: '#090d0e',
              }}
            >
              <VStack align="stretch" gap="0.25rem" pt="1rem" pb="2rem">
                {navItems.map(item => renderNavItem(item))}
              </VStack>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar Content */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <VStack align="stretch" gap="0.25rem" pt="0" pb="2rem">
          {navItems.map(item => renderNavItem(item))}
        </VStack>
      </Box>
    </>
  );
}
