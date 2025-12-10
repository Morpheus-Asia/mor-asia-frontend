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
const defaultNavItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/learn',
  },
];

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
            px={level > 0 ? "1.5rem" : "1rem"}
            mt={level === 0 ? "0.5rem" : "0"}
            mb={level === 0 ? "0.25rem" : "0"}
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
              px={level > 0 ? "1.5rem" : "1rem"}
              borderRadius="8px"
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
                fontSize={level > 0 ? "0.875rem" : "0.9375rem"}
                fontWeight={level > 0 ? "normal" : "bold"}
                color={isActive ? "#1fdc8f" : "rgba(255, 255, 255, 0.9)"}
                textAlign="left"
                pl={level > 0 ? "0.5rem" : "0"}
                lineHeight="1.6"
                wordBreak="break-word"
              >
                {item.label}
              </Text>
            </HStack>
          </Link>
        )}

        {/* Always show children (no collapse) */}
        {hasChildren && (
          <VStack align="stretch" mt="0.25rem" ml="1rem" gap="0.25rem">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </VStack>
        )}
      </Box>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(9, 13, 14, 0.7)',
              zIndex: 10000,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <Box display={{ base: 'block', lg: 'none' }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '280px',
                height: '100vh',
                background: '#090d0e',
                zIndex: 10001,
                overflowY: 'auto',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              className="learn-sidebar-scroll"
            >
              <VStack align="stretch" gap="0.25rem" pt="5rem" pb="2rem" px="1rem">
                <Text
                  fontSize="1.125rem"
                  fontWeight="bold"
                  color="white"
                  mb="0.5rem"
                  px="1rem"
                >
                  Documentation
                </Text>
                {navItems.map(item => renderNavItem(item))}
              </VStack>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar Content */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <VStack align="stretch" gap="0.25rem" pt="1rem" pb="2rem" px="1rem">
          {navItems.map(item => renderNavItem(item))}
        </VStack>
      </Box>
    </>
  );
}
